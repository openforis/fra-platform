import { combineSlices, configureStore, createSlice } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import createDebounce from 'redux-debounced'

import { LoginState } from 'client/store/login/state'
import { TablePaginatedState } from 'client/store/tablePaginated/state'

import axiosMiddleware from './middleware/axios'
import { listenerMiddleware } from './middleware/listener'
import rootReducer from './rootReducer'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LazyLoadedSlices {
  login: LoginState
  tablePaginated: TablePaginatedState
}

export const reducer = combineSlices(rootReducer).withLazyLoadedSlices<LazyLoadedSlices>()

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(createDebounce() as Middleware, axiosMiddleware),
})

export const injectSlice = (slice: ReturnType<typeof createSlice>) => {
  reducer.inject(slice)
}

export default store
