import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { getMetaState } from 'client/store/meta/selectors/state'
import { DashboardAreaType } from 'client/store/meta/state'
import { RootState } from 'client/store/types'

export const getDashboard = createSelector(
  [
    getMetaState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, key: DashboardAreaType) => key,
  ],
  (metadataState, assessmentName, cycleName, key) => metadataState.dashboard?.[assessmentName]?.[cycleName]?.[key]
)
