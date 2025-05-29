import { Assessment } from 'meta/assessment/assessment'

import { useAppSelector } from 'client/store/hooks'
import { MetadataSelectors } from 'client/store/meta/selectors'
import { useAssessmentRouteParams } from 'client/hooks/useRouteParams'

export const useAssessment = (): Assessment => {
  const { assessmentName } = useAssessmentRouteParams()

  return useAppSelector((state) => {
    if (assessmentName) return MetadataSelectors.getAssessment(state, assessmentName)
    return MetadataSelectors.getDefaultAssessment(state)
  })
}

export const useAssessments = (): Array<Assessment> => {
  return useAppSelector(MetadataSelectors.getAssessments)
}

export const useAssessmentDefault = (): Assessment => {
  return useAppSelector(MetadataSelectors.getDefaultAssessment)
}
