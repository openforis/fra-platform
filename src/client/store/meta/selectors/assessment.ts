import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'

import { getMetaState } from 'client/store/meta/selectors/state'
import { RootState } from 'client/store/types'

export const getAssessments = createSelector([getMetaState], (state) => state.assessments)

export const getAssessment = createSelector(
  [getAssessments, (_state: RootState, assessmentName: AssessmentName) => assessmentName],
  (assessments, assessmentName: AssessmentName) =>
    assessments.find((assessment) => assessment.props.name === assessmentName)
)

export const getDefaultAssessment = createSelector([getAssessments], (assessments) =>
  assessments.find((assessment) => assessment.props.default)
)
