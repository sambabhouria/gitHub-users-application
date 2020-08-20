import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { User } from 'app/types'

export interface UsersState {
    usersByLogin: Record<string, User>
    visibleUsers: string[]
    loading: boolean
    error: string | null
    since: number
    isLastPage: boolean
}

const usersInitialState: UsersState = {
    error: null,
    isLastPage: false,
    loading: false,
    since: 0,
    usersByLogin: {},
    visibleUsers: [],
}

interface UsersPayload {
    isLastPage: boolean
    users: User[]
}

const users = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {
        getUsersStart(state: UsersState): void {
            state.loading = true
            state.error = null
        },
        getUsersSuccess(state: UsersState, { payload }: PayloadAction<UsersPayload>): void {
            state.loading = false
            state.error = null
            payload.users.forEach((user) => {
                state.usersByLogin[user.login.toLowerCase()] = user
            })
            state.visibleUsers = state.visibleUsers.concat(payload.users.map((user) => user.login.toLowerCase()))
            state.since = state.visibleUsers.length
                ? state.usersByLogin[state.visibleUsers[state.visibleUsers.length - 1]].id
                : 0
            state.isLastPage = payload.isLastPage
        },
        getUsersFailure(state: UsersState, { payload }: PayloadAction<string>): void {
            state.loading = false
            state.error = payload
        },
    },
})

export const { getUsersStart, getUsersSuccess, getUsersFailure } = users.actions

export default users.reducer

// ACTIONS
export interface GetUsersAction {
    type: 'users/getUsersStart'
}

export interface GetUsersSuccessAction {
    type: 'users/getUsersSuccess'
    payload: UsersPayload
}

export interface GetUsersFailureAction {
    type: 'users/getUsersFailure'
    payload: string
}

export type UsersAction = GetUsersAction | GetUsersSuccessAction | GetUsersFailureAction
