import { createSelector } from '@reduxjs/toolkit'

import { MosaicSliceName } from 'client/store/geo/mosaic/slice/name'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state[GeoSliceName]?.[MosaicSliceName]

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
