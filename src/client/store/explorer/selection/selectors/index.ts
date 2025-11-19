import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'

import { ExplorerSelectionSlice } from 'client/store/explorer/selection/slice'
import type { ExplorerSelectionState } from 'client/store/explorer/selection/state'
import { defaultAxisSelection } from 'client/store/explorer/selection/state'
import { RootState } from 'client/store/types'

const _getState = (state: RootState): ExplorerSelectionState | undefined => {
  return state.explorer?.[ExplorerSelectionSlice.name]
}

const getCountries = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
  ],
  (filters: ExplorerSelectionState | undefined, assessmentName: AssessmentName, cycleName: CycleName) => {
    return filters?.[assessmentName]?.[cycleName]?.countries
  }
)

const _baseSelectors = [
  _getState,
  (_state: RootState, assessmentName: AssessmentName) => assessmentName,
  (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
  (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, sectionName: SectionName) => sectionName,
]

const getAxisSelection = createSelector(
  _baseSelectors,
  (
    filters: ExplorerSelectionState | undefined,
    assessmentName: AssessmentName,
    cycleName: CycleName,
    sectionName: SectionName
  ) => {
    return filters?.[assessmentName]?.[cycleName]?.axis?.[sectionName] ?? defaultAxisSelection
  }
)

const getDimensions = createSelector(
  _baseSelectors,
  (
    filters: ExplorerSelectionState | undefined,
    assessmentName: AssessmentName,
    cycleName: CycleName,
    sectionName: SectionName
  ) => {
    return filters?.[assessmentName]?.[cycleName]?.dimensions?.[sectionName] ?? []
  }
)

const getMeasures = createSelector(
  _baseSelectors,
  (
    filters: ExplorerSelectionState | undefined,
    assessmentName: AssessmentName,
    cycleName: CycleName,
    sectionName: SectionName
  ) => {
    return filters?.[assessmentName]?.[cycleName]?.measures?.[sectionName] ?? []
  }
)

const getUnits = createSelector(
  _baseSelectors,
  (
    filters: ExplorerSelectionState | undefined,
    assessmentName: AssessmentName,
    cycleName: CycleName,
    sectionName: SectionName
  ) => {
    return filters?.[assessmentName]?.[cycleName]?.units?.[sectionName]
  }
)

export const ExplorerSelectionSelectors = {
  getAxisSelection,
  getCountries,
  getDimensions,
  getMeasures,
  getUnits,
}
