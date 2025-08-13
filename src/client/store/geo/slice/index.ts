import { combineSlices } from '@reduxjs/toolkit'

import { LayersSlice } from 'client/store/geo/layers/slice'
import { GeoMapSlice } from 'client/store/geo/map/slice'
import { MosaicSlice } from 'client/store/geo/mosaic/slice'
import { GeoRecipesSlice } from 'client/store/geo/recipes/slice'

export const GeoSlice = combineSlices(GeoMapSlice, GeoRecipesSlice, LayersSlice, MosaicSlice)
