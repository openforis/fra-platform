import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import createDebounce from 'redux-debounced'

import { LinksState } from 'client/store/admin/links/state'
import { AdminSliceName } from 'client/store/admin/name'
import { GeoLayersState } from 'client/store/geo/layers/state'
import { GeoMapState } from 'client/store/geo/map/state'
import { GeoMosaicState } from 'client/store/geo/mosaic/state'
import { GeoRecipesState } from 'client/store/geo/recipes/state'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { LoginSliceName } from 'client/store/login/name'
import { LoginState } from 'client/store/login/state'
import { TablePaginatedSliceName } from 'client/store/tablePaginated/name'
import { TablePaginatedState } from 'client/store/tablePaginated/state'

import { GeoStatisticsState } from './geo/statistics/state'
import axiosMiddleware from './middleware/axios'
import { listenerMiddleware } from './middleware/listener'
import rootReducer from './rootReducer'

export interface LazyLoadedSlices {
  [AdminSliceName]: {
    links: LinksState
  }
  [GeoSliceName]: {
    layers: GeoLayersState
    map: GeoMapState
    mosaic: GeoMosaicState
    recipes: GeoRecipesState
    statistics: GeoStatisticsState
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

export const injectSlice = (slice: Parameters<typeof reducer.inject>[0]): void => {
  reducer.inject(slice)
}

export default store
