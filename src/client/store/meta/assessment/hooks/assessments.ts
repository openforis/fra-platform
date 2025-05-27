import { Assessment } from 'meta/assessment/assessment'

import { useAppSelector } from 'client/store/hooks'
import { AssessmentSelectors } from 'client/store/meta/assessment/selectors'
import { useAssessmentRouteParams } from 'client/hooks/useRouteParams'

export const useAssessment = (): Assessment => {
  const { assessmentName } = useAssessmentRouteParams()

  return useAppSelector((state) => {
    if (assessmentName) return AssessmentSelectors.getAssessment(state, assessmentName)
    return AssessmentSelectors.getDefaultAssessment(state)
  })
}

export const useAssessments = (): Array<Assessment> => {
  return useAppSelector(AssessmentSelectors.getAssessments)
}

export const useAssessmentDefault = (): Assessment => {
  return useAppSelector(AssessmentSelectors.getDefaultAssessment)
}
