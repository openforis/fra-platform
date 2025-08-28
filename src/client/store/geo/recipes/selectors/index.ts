import { createSelector } from '@reduxjs/toolkit'

import { LayerSectionKey } from 'meta/geo'

import { GeoRecipesSliceName } from 'client/store/geo/recipes/slice/name'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state[GeoSliceName]?.[GeoRecipesSliceName]

const getSectionRecipe = createSelector(
  [_getState, (_state: RootState, sectionKey: LayerSectionKey) => sectionKey],
  (state, sectionKey) => {
    return state?.[sectionKey]
  }
)

export const GeoRecipesSelectors = {
  getSectionRecipe,
}
