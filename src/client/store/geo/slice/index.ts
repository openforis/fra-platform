import { combineSlices } from '@reduxjs/toolkit'

import { GeoMapSlice } from 'client/store/geo/map/slice'

export const GeoSlice = combineSlices(GeoMapSlice)
