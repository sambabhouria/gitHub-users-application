import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable'

import rootEpic from './rootEpic'
import rootReducer from './rootReducer'

const epicMiddleware = createEpicMiddleware()

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
    reducer: rootReducer,
})

/* enable HMR for reducers */
// if (process.env.NODE_ENV === 'development' && module.hot) {
//     module.hot.accept('./rootReducer', () => {
//         const newRootReducer = require('./rootReducer').default
//         store.replaceReducer(newRootReducer)
//     })
// }

epicMiddleware.run(rootEpic)

export type AppDispatch = typeof store.dispatch

export default store
