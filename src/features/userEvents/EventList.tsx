import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { User } from 'app/types'
import { ErrorBox, Spinner } from 'common/components'

import { EventListItem } from './EventListItem'
import { getEventsStart } from './userEventsSlice'

interface ELProps {
    user: User
}

export const EventList = ({ user }: ELProps) => {
    const { login } = user

    const dispatch = useDispatch()

    const { loading, error: eventsError, eventsByUser } = useSelector((state: RootState) => state.userEvents)

    const events = eventsByUser[user.login.toLowerCase()]

    useEffect(() => {
        if (!events) {
            dispatch(getEventsStart({ login }))
        }
    }, [events, login, dispatch])

    if (loading) {
        return <Spinner />
    }

    if (eventsError) {
        return <ErrorBox message={eventsError} />
    }

    return (
        <div data-testid="events">
            {events && events.length ? (
                events.map((event) => <EventListItem key={event.id} event={event} user={user} />)
            ) : (
                <div>No PR events recently.</div>
            )}
        </div>
    )
}
