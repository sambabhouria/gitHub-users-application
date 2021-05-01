import { ActionsObservable } from 'redux-observable'
import { from } from 'rxjs'
import { catchError, filter, map, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { getUserDetails } from 'api/apiGithubUsers'
import { UserDetails as Details, UserDetailsResponse } from 'app/types'

import {
    GetUserDetailsAction,
    UserAction,
    getUserDetailsFailure,
    getUserDetailsStart,
    getUserDetailsSuccess,
} from './userDetailsSlice'

const UserDetails = (userResponse: UserDetailsResponse): Details => ({
    avatarUrl: userResponse.avatar_url,
    id: userResponse.id,
    login: userResponse.login,
    name: userResponse.name,
    publicRepos: userResponse.public_repos,
})

export const getUserDetailsEpic = (action$: ActionsObservable<UserAction>) =>
    action$.pipe(
        filter(isOfType(getUserDetailsStart.type)),
        map((action) => action as GetUserDetailsAction),
        switchMap((action) =>
            from(getUserDetails(action.payload.login)).pipe(
                map((response: UserDetailsResponse) => UserDetails(response)),
                map((userDetails) => getUserDetailsSuccess(userDetails)),
                catchError(async (error) =>
                    Promise.resolve({
                        payload: error.message,
                        type: getUserDetailsFailure.type,
                    })
                )
            )
        )
    )
