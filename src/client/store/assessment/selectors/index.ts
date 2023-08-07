import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment'

import { RootState } from 'client/store/RootState'

const getAssessment = createSelector(
  [
    (state: RootState) => state.assessment.assessments,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
  ],
  (assessments, assessmentName: AssessmentName) =>
    assessments.find((assessment) => assessment.props.name === assessmentName)
)

export const AssessmentSelectors = {
  getAssessment,
}
