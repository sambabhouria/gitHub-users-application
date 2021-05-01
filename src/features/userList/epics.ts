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

/*
  The real power comes when you need to do something asynchronous.
  Let's say you want to dispatch PONG 1 second after receiving the PING:

    const pingEpic = action$ => action$.pipe(
    filter(action => action.type === 'PING'),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({ type: 'PONG' })
    );

    // later...
    dispatch({ type: 'PING' });

    Your reducers will receive the original PING action, then 1 second later receive the PONG.

        const pingReducer = (state = { isPinging: false }, action) => {
        switch (action.type) {
            case 'PING':
            return { isPinging: true };

            case 'PONG':
            return { isPinging: false };

        default:
        return state;
        }
     };

    Since filtering by a specific action type is so common, redux-observable includes an ofType operator to reduce that boilerplate:


    import { ofType } from 'redux-observable';
    const pingEpic = action$ => action$.pipe(
    ofType('PING'),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({ type: 'PONG' })
    );

    Need to match against multiple action types? No problem! ofType accepts any number of arguments! action$.pipe(ofType(FIRST, SECOND, THIRD)) // FIRST or SECOND or THIRD

    Combining Epics
    Finally, redux-observable provides a utility called combineEpics() that allows you to easily combine multiple Epics into a single one:

        import { combineEpics } from 'redux-observable';

        const rootEpic = combineEpics(
        pingEpic,
        fetchUserEpic
        );
     Note that this is equivalent to:

    import { merge } from 'rxjs/observable/merge';

    const rootEpic = (action$, state$) => merge(
    pingEpic(action$, state$),
    fetchUserEpic(action$, state$)
    );

   https://github.com/erikras/ducks-modular-redux

   redux/modules/root.js

    import { combineEpics } from 'redux-observable';
    import { combineReducers } from 'redux';
    import ping, { pingEpic } from './ping';
    import users, { fetchUserEpic } from './users';

    export const rootEpic = combineEpics(
    pingEpic,
    fetchUserEpic
    );

    export const rootReducer = combineReducers({
    ping,
    users
    });

    // Configuring The Store
    // Now create an instance of the redux-observable middleware.
    import { createEpicMiddleware } from 'redux-observable';

    const epicMiddleware = createEpicMiddleware();
    Then you pass this to the createStore function from Redux.

    import { createStore, applyMiddleware } from 'redux';

    const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
    );

    And after that you call epicMiddleware.run() with the rootEpic you created earlier.

    import { rootEpic } from './modules/root';

    epicMiddleware.run(rootEpic);

 */

export const getUsersEpic = (action$: ActionsObservable<UsersAction>, state$: StateObservable<any>) => {
    console.log('user-items', UserItem)
    return action$.pipe(
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
}
