import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/RootState'
import { AreaSelectorSlice } from 'client/store/ui/areaSelector/slice'
import { AreaSelectorMode } from 'client/store/ui/areaSelector/state'

const _getState = (state: RootState) => state.ui[AreaSelectorSlice.name]

const getMode = createSelector(_getState, (areaSelector) => areaSelector.mode)
const isExpanded = createSelector(getMode, (mode) => mode === AreaSelectorMode.expanded)

export const AreaSelectorSelectors = {
  getMode,
  isExpanded,
}
