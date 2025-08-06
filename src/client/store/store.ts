import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import createDebounce from 'redux-debounced'

import { LinksState } from 'client/store/admin/links/state'
import { AdminSliceName } from 'client/store/admin/slice'
import { GeoMapState } from 'client/store/geo/map/state'
import { GeoSliceName } from 'client/store/geo/slice'
import { LoginSlice } from 'client/store/login/slice'
import { LoginState } from 'client/store/login/state'
import { TablePaginatedSlice } from 'client/store/tablePaginated/slice'
import { TablePaginatedState } from 'client/store/tablePaginated/state'

import axiosMiddleware from './middleware/axios'
import { listenerMiddleware } from './middleware/listener'
import rootReducer from './rootReducer'

export interface LazyLoadedSlices {
  [AdminSliceName]: {
    links: LinksState
  }
  [GeoSliceName]: {
    map: GeoMapState
  }
  [LoginSlice.name]: LoginState
  [TablePaginatedSlice.name]: TablePaginatedState
}

export const reducer = combineSlices(rootReducer).withLazyLoadedSlices<LazyLoadedSlices>()

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(createDebounce() as Middleware, axiosMiddleware),
})

export const injectSlice = (slice: Parameters<typeof reducer.inject>[0]) => {
  reducer.inject(slice)
}

export default store
