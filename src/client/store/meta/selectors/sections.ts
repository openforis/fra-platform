import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { getMetaState } from 'client/store/meta/selectors/state'
import { RootState } from 'client/store/types'

export const getSections = createSelector(
  [
    getMetaState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
  ],
  (metadataState, assessmentName, cycleName) => metadataState.sections?.[assessmentName]?.[cycleName]
)
