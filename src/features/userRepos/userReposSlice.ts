import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Repo } from 'app/types'

export interface ReposState {
    reposByUser: Record<string, Repo[] | undefined>
    loading: boolean
    error: string | null
}

export const initialState: ReposState = {
    error: null,
    loading: false,
    reposByUser: {},
}

interface ReposPayload {
    login: string
    repos: Repo[]
}

interface StartPayload {
    login: string
    page: number
}

const repos = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        getReposStart(state: ReposState, _action: PayloadAction<StartPayload>): void {
            state.loading = true
            state.error = null
        },
        getReposSuccess(state: ReposState, action: PayloadAction<ReposPayload>): void {
            state.loading = false
            state.error = null
            const login = action.payload.login.toLowerCase()
            const currentUserRepos = state.reposByUser[login] || []
            state.reposByUser[login] = [...currentUserRepos, ...action.payload.repos]
        },
        getReposFailure(state: ReposState, action: PayloadAction<string>): void {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { getReposStart, getReposSuccess, getReposFailure } = repos.actions

export default repos.reducer

// ACTIONS
export interface GetReposAction {
    type: 'repos/getReposStart'
    payload: StartPayload
}

export interface GetReposSuccessAction {
    type: 'repos/getReposSuccess'
    payload: ReposPayload
}

export interface GetReposFailureAction {
    type: 'repos/getReposFailure'
    payload: string
}

export type ReposAction = GetReposAction | GetReposSuccessAction | GetReposFailureAction
