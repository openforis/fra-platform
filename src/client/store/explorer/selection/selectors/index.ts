import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { ExplorerSelectionSlice } from 'client/store/explorer/selection/slice'
import { defaultAxisSelection } from 'client/store/explorer/selection/state'
import { ExplorerSliceName } from 'client/store/explorer/slice/name'
import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state?.[ExplorerSliceName]?.[ExplorerSelectionSlice.name]

const _getSelection = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
  ],
  (state, assessmentName, cycleName) => state?.[assessmentName]?.[cycleName]
)

const getCountries = createSelector([_getSelection], (selection) => {
  return selection?.countries
})

const getAxisSelection = createSelector(
  [_getSelection, (_state, _assessmentName, __cycleName, sectionName) => sectionName],
  (selection, sectionName) => {
    return selection?.axis?.[sectionName] ?? defaultAxisSelection
  }
)

const getDimensions = createSelector(
  [_getSelection, (_state, _assessmentName, __cycleName, sectionName) => sectionName],
  (selection, sectionName) => {
    return selection?.dimensions?.[sectionName] ?? []
  }
)

const getMeasures = createSelector(
  [_getSelection, (_state, _assessmentName, __cycleName, sectionName) => sectionName],
  (selection, sectionName) => {
    return selection?.measures?.[sectionName] ?? []
  }
)

const getOrderBy = createSelector(
  [_getSelection, (_state, _assessmentName, __cycleName, sectionName) => sectionName],
  (selection, sectionName) => {
    return selection?.orderBy?.[sectionName] ?? null
  }
)

const getUnits = createSelector(
  [_getSelection, (_state, _assessmentName, __cycleName, sectionName) => sectionName],
  (selection, sectionName) => {
    return selection?.units?.[sectionName]
  }
)

export const ExplorerSelectionSelectors = {
  getAxisSelection,
  getCountries,
  getDimensions,
  getMeasures,
  getOrderBy,
  getUnits,
}
