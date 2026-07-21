import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import createDebounce from 'redux-debounced'

import { DataExportSliceName } from 'client/store/dataExport/slice/name'
import { DataExportState } from 'client/store/dataExport/state'
import { ExplorerDataState } from 'client/store/explorer/data/state'
import { ExplorerMetadataState } from 'client/store/explorer/metadata/state'
import { ExplorerSelectionState } from 'client/store/explorer/selection/state'
import { ExplorerSliceName } from 'client/store/explorer/slice/name'
import { GeoBoundariesState } from 'client/store/geo/boundaries/state'
import { GeoLayersState } from 'client/store/geo/layers/state'
import { GeoMapState } from 'client/store/geo/map/state'
import { GeoMosaicState } from 'client/store/geo/mosaic/state'
import { GeoRecipesState } from 'client/store/geo/recipes/state'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { LinksSliceName } from 'client/store/links/slice/name'
import { LinksState } from 'client/store/links/state'
import { TablePaginatedSliceName } from 'client/store/tablePaginated/name'
import { TablePaginatedState } from 'client/store/tablePaginated/state'

import { GeoStatisticsState } from './geo/statistics/state'
import axiosMiddleware from './middleware/axios'
import { listenerMiddleware } from './middleware/listener'
import rootReducer from './rootReducer'

export interface LazyLoadedSlices {
  [DataExportSliceName]: DataExportState
  [ExplorerSliceName]: {
    data: ExplorerDataState
    metadata: ExplorerMetadataState
    selection: ExplorerSelectionState
  }
  [GeoSliceName]: {
    boundaries: GeoBoundariesState
    layers: GeoLayersState
    map: GeoMapState
    mosaic: GeoMosaicState
    recipes: GeoRecipesState
    statistics: GeoStatisticsState
  }
  [LinksSliceName]: LinksState
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
