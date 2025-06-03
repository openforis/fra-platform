import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createDebounce from 'redux-debounced'

import axiosMiddleware from './middleware/axios'
import { listenerMiddleware } from './middleware/listener'
import rootReducer from './rootReducer'

const asyncReducers: Record<string, any> = {}

const createReducer = () =>
  combineReducers({
    ...rootReducer,
    ...asyncReducers,
  })

const store = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(createDebounce(), axiosMiddleware),
})

export const injectReducer = (key: string, asyncReducer: any) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer())
  }
}

export const removeReducer = (key: string) => {
  if (asyncReducers[key]) {
    delete asyncReducers[key]
    store.replaceReducer(createReducer())
  }
}

export default store
