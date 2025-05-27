import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.meta.assessment

const getAssessments = createSelector([getState], (state) => state.assessments)

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
