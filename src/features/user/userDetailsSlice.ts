import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { UserDetails } from 'app/types'

export interface DetailsState {
    detailsByUser: Record<string, UserDetails | undefined>
    loading: boolean
    error: string | null
}

const initialState: DetailsState = {
    detailsByUser: {},
    error: null,
    loading: false,
}

interface StartPayload {
    login: string
}

const userDetails = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        getUserDetailsStart(state, _action: PayloadAction<StartPayload>): void {
            state.loading = true
            state.error = null
        },
        getUserDetailsSuccess(state: DetailsState, action: PayloadAction<UserDetails>): void {
            state.loading = false
            state.error = null
            const { id, login, avatarUrl, name, publicRepos } = action.payload
            state.detailsByUser[login.toLowerCase()] = {
                avatarUrl,
                id,
                login,
                name,
                publicRepos,
            }
        },
        getUserDetailsFailure(state: DetailsState, action: PayloadAction<string>): void {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { getUserDetailsStart, getUserDetailsSuccess, getUserDetailsFailure } = userDetails.actions

export default userDetails.reducer

// ACTIONS
export interface GetUserDetailsAction {
    type: 'userDetails/getUserDetailsStart'
    payload: StartPayload
}

export interface GetUserDetailsSuccessAction {
    type: 'userDetails/getUserDetailsSuccess'
    payload: UserDetails
}

export interface GetUserDetailsFailureAction {
    type: 'userDetails/getUserDetailsFailure'
    payload: string
}

export type UserAction = GetUserDetailsAction | GetUserDetailsSuccessAction | GetUserDetailsFailureAction
