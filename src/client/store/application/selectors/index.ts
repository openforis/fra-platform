import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.application

const getAssessments = createSelector([getState], (state) => state.assessments)

const getAssessment = createSelector(
  [getAssessments, (_state: RootState, assessmentName: AssessmentName) => assessmentName],
  (assessments, assessmentName: AssessmentName) =>
    assessments.find((assessment) => assessment.props.name === assessmentName)
)

const getDefaultAssessment = createSelector([getAssessments], (assessments) =>
  assessments.find((assessment) => assessment.props.default)
)

const isAppInitialized = createSelector([getState], (state) => state.appInitialized === true)

export const ApplicationSelectors = {
  getAssessments,
  getAssessment,
  getDefaultAssessment,
  isAppInitialized,
}
