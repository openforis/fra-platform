import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'

import { ExplorerFilterSlice } from 'client/store/explorer/filter/slice'
import { RootState } from 'client/store/RootState'

const _getState = (state: RootState) => state.explorer[ExplorerFilterSlice.name]

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

export const ExplorerFilterSelectors = {
  getCountries,
  getDimensions,
  getMeasures,
}
