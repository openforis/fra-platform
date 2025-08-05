import { combineSlices } from '@reduxjs/toolkit'

import { GeoMapSlice } from 'client/store/geo/map/slice'

export const GeoSlice = combineSlices(GeoMapSlice)
export const GeoSliceName = 'geoNew' // TODO: Change to 'geo' at the end of the refactor
