import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment'

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

const getSettings = createSelector([(state: RootState) => state.assessment.settings], (settings) => settings)

const getDefaultAssessment = createSelector([getAssessments, getSettings], (assessments, settings) =>
  assessments.find((assessment) => assessment.id === settings.defaultAssessmentId)
)

export const AssessmentSelectors = {
  getAssessments,
  getAssessment,
  getDefaultAssessment,
  getSettings,
}
