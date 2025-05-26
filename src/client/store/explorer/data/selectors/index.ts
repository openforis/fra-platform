import { createSelector } from '@reduxjs/toolkit'

import { SectionName } from 'meta/assessment/section'

import { ExplorerDataSlice } from 'client/store/explorer/data/slice'
import { RootState } from 'client/store/RootState'

const _getState = (state: RootState) => state.explorer[ExplorerDataSlice.name]

export const getSectionData = createSelector(
  [_getState, (_state: RootState, sectionName: SectionName) => sectionName],
  (data, sectionName) => data?.[sectionName]
)

export const ExplorerDataSelectors = {
  getSectionData,
}
