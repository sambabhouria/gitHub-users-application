import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Event } from 'app/types'

export interface EventsState {
    eventsByUser: Record<string, Event[] | undefined>
    loading: boolean
    error: string | null
}

const initialState: EventsState = {
    error: null,
    eventsByUser: {},
    loading: false,
}

interface EventsPayload {
    login: string
    events: Event[]
}

interface StartPayload {
    login: string
}

const events = createSlice({
    name: 'events',
    initialState,
    reducers: {
        getEventsStart(state: EventsState, _action: PayloadAction<StartPayload>): void {
            state.loading = true
            state.error = null
        },
        getEventsSuccess(state: EventsState, action: PayloadAction<EventsPayload>): void {
            const { login } = action.payload
            state.eventsByUser[login.toLowerCase()] = action.payload.events
            state.loading = false
            state.error = null
        },
        getEventsFailure(state: EventsState, action: PayloadAction<string>): void {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { getEventsStart, getEventsSuccess, getEventsFailure } = events.actions

export default events.reducer

// ACTIONS
export interface GetEventsAction {
    type: 'events/getEventsStart'
    payload: StartPayload
}

export interface GetEventsSuccessAction {
    type: 'events/getEventsSuccess'
    payload: EventsPayload
}

export interface GetEventsFailureAction {
    type: 'events/getEventsFailure'
    payload: string
}

export type EventsAction = GetEventsAction | GetEventsSuccessAction | GetEventsFailureAction
