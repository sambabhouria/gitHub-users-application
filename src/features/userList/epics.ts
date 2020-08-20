import { ActionsObservable, StateObservable } from 'redux-observable'
import { from } from 'rxjs'
import { throttleTime, catchError, filter, map, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { getUsers } from 'api/apiGithubUsers'
import { User, UserResponse, UsersResponse } from 'app/types'

import { UsersAction, getUsersFailure, getUsersStart, getUsersSuccess } from './usersSlice'

const UserItem = (userResponse: UserResponse): User => ({
    avatarUrl: userResponse.avatar_url,
    id: userResponse.id,
    login: userResponse.login,
})

export const getUsersEpic = (action$: ActionsObservable<UsersAction>, state$: StateObservable<any>) =>
    action$.pipe(
        filter(isOfType(getUsersStart.type)),
        throttleTime(500),
        switchMap(() =>
            from(getUsers(state$.value.users.since)).pipe(
                map((response: UsersResponse) => ({
                    users: response.items.map(UserItem),
                    isLastPage: response.isLastPage,
                })),
                map((data) => getUsersSuccess(data)),
                catchError(async (error) =>
                    Promise.resolve({
                        payload: error.message,
                        type: getUsersFailure.type,
                    })
                )
            )
        )
    )
