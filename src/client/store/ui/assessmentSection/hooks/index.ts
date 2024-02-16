import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useAppSelector } from 'client/store'
import { AssessmentSectionSelectors } from 'client/store/ui/assessmentSection/selectors'

export { useIsEstimationPending } from './useIsEstimatePending'

export const useIsDescriptionEditEnabled = (props: {
  sectionName: SectionName
  name: CommentableDescriptionName
}): boolean => {
  const { sectionName, name } = props
  return useAppSelector((state) => AssessmentSectionSelectors.isDescriptionEditEnabled(state, sectionName, name))
}

export const useShowOriginalDatapoints = (): boolean => useAppSelector(AssessmentSectionSelectors.showOriginalDataPoint)
