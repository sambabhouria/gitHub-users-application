import { ActionsObservable } from 'redux-observable'
import { from } from 'rxjs'
import { catchError, filter, map, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { getEvents } from 'api/apiGithubUsers'
import { Event, EventResponse, EventsResponse } from 'app/types'

import { EventsAction, GetEventsAction, getEventsFailure, getEventsStart, getEventsSuccess } from './userEventsSlice'

const FILTER_EVENT_TYPE = 'PullRequestEvent'

const EventItem = (eventResponse: EventResponse): Event => ({
    action: eventResponse.payload.action,
    date: eventResponse.created_at,
    id: eventResponse.id,
    repo: { id: eventResponse.repo.id, name: eventResponse.repo.name },
    type: eventResponse.type,
    urlPR: eventResponse.payload.pull_request?.html_url,
})

export const getUserEventsEpic = (action$: ActionsObservable<EventsAction>) =>
    action$.pipe(
        filter(isOfType(getEventsStart.type)),
        map((action) => action as GetEventsAction),
        switchMap((action) => {
            return from(getEvents(action.payload.login)).pipe(
                map((response: EventsResponse) =>
                    response.items.filter((ev) => ev.type === FILTER_EVENT_TYPE).map(EventItem)
                ),
                map((events) => getEventsSuccess({ login: action.payload.login, events })),
                catchError(async (error) =>
                    Promise.resolve({
                        payload: error.message,
                        type: getEventsFailure.type,
                    })
                )
            )
        })
    )
