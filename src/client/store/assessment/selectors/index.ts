import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'

import { RootState } from 'client/store/RootState'

const getAssessments = createSelector(
  [(state: RootState) => state.assessment.assessments],
  (assessments) => assessments
)

const getAssessment = createSelector(
  [getAssessments, (_state: RootState, assessmentName: AssessmentName) => assessmentName],
  (assessments, assessmentName: AssessmentName) =>
    assessments.find((assessment) => assessment.props.name === assessmentName)
)

const getDefaultAssessment = createSelector([getAssessments], (assessments) =>
  assessments.find((assessment) => assessment.props.default)
)

export const AssessmentSelectors = {
  getAssessments,
  getAssessment,
  getDefaultAssessment,
}
