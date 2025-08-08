import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'

import { MosaicSliceName } from 'client/store/geo/mosaic/slice/name'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state[GeoSliceName]?.[MosaicSliceName]

const getCountryUrl = createSelector(
  [_getState, (_state: RootState, countryIso: CountryIso) => countryIso],
  (state, countryIso) => {
    return state?.url[countryIso]
  }
)

const getOptions = createSelector(_getState, (state) => state?.options)

const getSelected = createSelector(_getState, (state) => state?.selected)

const getStatus = createSelector(_getState, (state) => state?.status)

const getUiOptions = createSelector(_getState, (state) => state?.ui)

export const MosaicSelectors = {
  getCountryUrl,
  getOptions,
  getSelected,
  getStatus,
  getUiOptions,
}
