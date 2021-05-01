import { ActionsObservable, StateObservable } from 'redux-observable'
import { from } from 'rxjs'
import { throttleTime, catchError, filter, map, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { getUsers } from 'api/apiGithubUsers'
import { User, UserResponse, UsersResponse } from 'app/types'

import { UsersAction, getUsersFailure, getUsersStart, getUsersSuccess } from './usersSlice'

/**
 *https://sung.codes/blog/2019/10/18/preventing-multiple-observables-from-firing-from-redux-observable/

 $https://codesandbox.io/s/basic-example-kgq57?from-embed=&file=/src/redux/modules/ping.ts
 * example of ping pon 
 * 
 * import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux' 
import { createEpicMiddleware } from 'redux-observable'
import { connect, Provider } from 'react-redux'

import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/delay'

const pingReducer = (state = { isPinging: false }, action) => {
  switch (action.type) {
    case 'PING':
      return { isPinging: true };
    case 'PONG':
      return { isPinging: false };
    default:
      return state;
  }
}

const pingEpic = action$ => action$.filter(action => action.type === 'PING')
  .delay(1000) 
  .mapTo({ type: 'PONG' })

const epicMiddleware = createEpicMiddleware(pingEpic);

const store = createStore(pingReducer, applyMiddleware(epicMiddleware))

const PingComponent = ({dispatch, isPinging}) => {
  return (
    <div>
      <div>isPinging: {isPinging.toString()}</div>
      <div>
        <button onClick={ (e) => dispatch({type: 'PING'}) }>Dispatch Ping</button>
      </div>
    </div>
  )
}

// Build App
const App = () => {
  let PingContainer = connect( state => state )(PingComponent)
  return (
    <Provider store={store}>
      <PingContainer />
    </Provider>
  )
}

// Render App
ReactDom.render(
  <App />,
  document.body.appendChild(document.createElement('div'))
)
 */
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

    Integrate the code above with your existing Store configuration so that it looks like this:

    redux/configureStore.js
    import { createStore, applyMiddleware } from 'redux';
    import { createEpicMiddleware } from 'redux-observable';
    import { rootEpic, rootReducer } from './modules/root';

    const epicMiddleware = createEpicMiddleware();

    export default function configureStore() {
    const store = createStore(
        rootReducer,
        applyMiddleware(epicMiddleware)
    );

    epicMiddleware.run(rootEpic);

    return store;
    }

    Redux DevTools
    To enable Redux DevTools Extension, just use window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ or import redux-devtools-extension npm package.


    import { compose } from 'redux'; // and your other imports from before
    const epicMiddleware = createEpicMiddleware();

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(pingReducer,
    composeEnhancers(
        applyMiddleware(epicMiddleware)
    )
    );

    epicMiddleware.run(pingEpic);

    https://redux-observable.js.org/docs/recipes/Cancellation.html
    Cancelling some async side effects is a common requirement of Epics.
    While there are several ways of doing this depending on your requirements,
    the most common way is to have your application dispatch a cancellation action and listen for it inside your Epic.
    This can be done with the takeUntil() RxJS operator:

    import { ajax } from 'rxjs/ajax';

    const fetchUserEpic = action$ => action$.pipe(
    ofType(FETCH_USER),
    mergeMap(action => ajax.getJSON(`/api/users/${action.payload}`).pipe(
        map(response => fetchUserFulfilled(response)),
        takeUntil(action$.pipe(
        ofType(FETCH_USER_CANCELLED)
        ))
    ))
    );
 */

const UserItem = (userResponse: UserResponse): User => ({
    avatarUrl: userResponse.avatar_url,
    id: userResponse.id,
    login: userResponse.login,
})

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
