import { createSelector } from '@reduxjs/toolkit'

import { GeoMosaicSliceName } from 'client/store/geo/mosaic/slice/name'
import { GeoMosaicState } from 'client/store/geo/mosaic/state'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { RootState } from 'client/store/types'

const _getState = (state: RootState): GeoMosaicState => state[GeoSliceName]?.[GeoMosaicSliceName]

const getOptions = createSelector(_getState, (state) => state?.options)

const getSelected = createSelector(_getState, (state) => state?.selected ?? false)

const getStatus = createSelector(_getState, (state) => state?.status)

const getUrlTemplateData = createSelector(_getState, (state) => state?.urlTemplateData)

export const MosaicSelectors = {
  getOptions,
  getSelected,
  getStatus,
  getUrlTemplateData,
}
