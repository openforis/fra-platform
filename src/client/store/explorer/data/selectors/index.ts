import { createSelector } from '@reduxjs/toolkit'

import { SectionName } from 'meta/assessment/section'

import { ExplorerDataSlice } from 'client/store/explorer/data/slice'
import { ExplorerDataState } from 'client/store/explorer/data/state'
import { RootState } from 'client/store/types'

const _getState = (state: RootState): ExplorerDataState => state.explorer?.[ExplorerDataSlice.name]

export const getSectionData = createSelector(
  [_getState, (_state: RootState, sectionName: SectionName): string => sectionName],
  (data, sectionName) => data?.[sectionName]
)

export const ExplorerDataSelectors = {
  getSectionData,
}
