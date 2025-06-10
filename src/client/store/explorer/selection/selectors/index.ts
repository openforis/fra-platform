import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'

import { ExplorerSelectionSlice } from 'client/store/explorer/selection/slice'
import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state.explorer[ExplorerSelectionSlice.name]

const getCountries = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
  ],
  (filters, assessmentName, cycleName) => {
    return filters?.[assessmentName]?.[cycleName]?.countries
  }
)

const getDimensions = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, sectionName: SectionName) =>
      sectionName,
  ],
  (filters, assessmentName, cycleName, sectionName) => {
    return filters?.[assessmentName]?.[cycleName]?.dimensions?.[sectionName]
  }
)

const getMeasures = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, sectionName: SectionName) =>
      sectionName,
  ],
  (filters, assessmentName, cycleName, sectionName) => {
    return filters?.[assessmentName]?.[cycleName]?.measures?.[sectionName]
  }
)

export const ExplorerSelectionSelectors = {
  getCountries,
  getDimensions,
  getMeasures,
}
