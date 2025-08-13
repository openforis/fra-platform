import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import createDebounce from 'redux-debounced'

import { LinksState } from 'client/store/admin/links/state'
import { AdminSliceName } from 'client/store/admin/name'
import { GeoMapState } from 'client/store/geo/map/state'
import { MosaicState } from 'client/store/geo/mosaic/state'
import { GeoRecipesState } from 'client/store/geo/recipes/state'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { LoginSliceName } from 'client/store/login/name'
import { LoginState } from 'client/store/login/state'
import { TablePaginatedSliceName } from 'client/store/tablePaginated/name'
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
    mosaic: MosaicState
    recipes: GeoRecipesState
  }
  [LoginSliceName]: LoginState
  [TablePaginatedSliceName]: TablePaginatedState
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
