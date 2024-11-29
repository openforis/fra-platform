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

const _getDashboardState = createSelector(
  [
    (state: RootState) => state.metadata,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, key: DashboardAreaType) => key,
  ],
  (metadataState, assessmentName, cycleName, key) => metadataState.dashboard?.[assessmentName]?.[cycleName]?.[key]
)

const getDashboardItems = createSelector([_getDashboardState], (dashboardState) => dashboardState?.items)
const getDashboardLoaded = createSelector([_getDashboardState], (dashboardState) => Boolean(dashboardState?.loaded))

export const MetadataSelectors = {
  getSections,
  getDashboardItems,
  getDashboardLoaded,
}
