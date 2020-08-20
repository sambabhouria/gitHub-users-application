import { combineEpics } from 'redux-observable'

import { getUserDetailsEpic } from 'features/user/epics'
import { getUserEventsEpic } from 'features/userEvents/epics'
import { getUsersEpic } from 'features/userList/epics'
import { getUserReposEpic } from 'features/userRepos/epics'

const rootEpic = combineEpics(getUsersEpic, getUserDetailsEpic, getUserEventsEpic, getUserReposEpic)

export default rootEpic
