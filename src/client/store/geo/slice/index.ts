import { combineSlices } from '@reduxjs/toolkit'

import { GeoMapSlice } from 'client/store/geo/map/slice'
import { MosaicSlice } from 'client/store/geo/mosaic/slice'

export const GeoSlice = combineSlices(GeoMapSlice, MosaicSlice)
