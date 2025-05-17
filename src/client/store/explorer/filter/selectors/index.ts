import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { ExplorerFilterSlice } from 'client/store/explorer/filter/slice'
import { RootState } from 'client/store/RootState'

const _getState = (state: RootState) => state.explorer[ExplorerFilterSlice.name]

export const getCountries = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
  ],
  (filters, assessmentName, cycleName) => {
    return filters?.[assessmentName]?.[cycleName]?.countries
  }
)

export const ExplorerFilterSelectors = {
  getCountries,
}
