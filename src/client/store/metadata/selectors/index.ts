import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName, CycleName } from 'meta/assessment'

import { DashboardAreaType } from 'client/store/metadata/state'
import { RootState } from 'client/store/RootState'

const getSections = createSelector(
  [
    (state: RootState) => state.metadata,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
  ],
  (metadataState, assessmentName, cycleName) => metadataState.sections?.[assessmentName]?.[cycleName]
)

const getDashboard = createSelector(
  [
    (state: RootState) => state.metadata,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, key: DashboardAreaType) => key,
  ],
  (metadataState, assessmentName, cycleName, key) => metadataState.dashboard?.[assessmentName]?.[cycleName]?.[key]
)

export const MetadataSelectors = {
  getSections,
  getDashboard,
}
