import { configureStore } from '@reduxjs/toolkit'
import createDebounce from 'redux-debounced'

import axiosMiddleware from './middleware/axios'
import { listenerMiddleware } from './middleware/listener'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(createDebounce(), axiosMiddleware),
})

// injectReducers has TypeScript issues. uncomment code below if injectReducers will be ever needed
// const asyncReducers: any = {}

// export const injectReducers = (name: string, asyncReducer: any) => {
//   asyncReducers[name] = asyncReducer
//
//   store.replaceReducer(combineReducers({ ...rootReducer, ...asyncReducers }))
// }

export default store
