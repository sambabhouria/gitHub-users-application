import { ActionsObservable } from 'redux-observable'
import { from } from 'rxjs'
import { catchError, filter, map, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { getRepos } from 'api/apiGithubUsers'
import { Repo, RepoResponse, ReposResponse } from 'app/types'

import { GetReposAction, ReposAction, getReposFailure, getReposStart, getReposSuccess } from './userReposSlice'

const RepoItem = (repoResponse: RepoResponse): Repo => ({
    id: repoResponse.id,
    name: repoResponse.name,
})

export const getUserReposEpic = (action$: ActionsObservable<ReposAction>) =>
    action$.pipe(
        filter(isOfType(getReposStart.type)),
        map((action) => action as GetReposAction),
        switchMap((action) => {
            return from(getRepos(action.payload.login, action.payload.page)).pipe(
                map((response: ReposResponse) => response.items.map(RepoItem)),
                map((repos) => getReposSuccess({ login: action.payload.login, repos })),
                catchError(async (error) =>
                    Promise.resolve({
                        payload: error.message,
                        type: getReposFailure.type,
                    })
                )
            )
        })
    )
