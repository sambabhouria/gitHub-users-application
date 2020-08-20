import { combineReducers } from 'redux'

import userDetailsReducer from 'features/user/userDetailsSlice'
import userEventsReducer from 'features/userEvents/userEventsSlice'
import usersReducer from 'features/userList/usersSlice'
import userReposReducer from 'features/userRepos/userReposSlice'

const rootReducer = combineReducers({
    userDetails: userDetailsReducer,
    userEvents: userEventsReducer,
    userRepos: userReposReducer,
    users: usersReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
