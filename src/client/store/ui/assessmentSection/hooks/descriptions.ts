import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { useAppSelector } from 'client/store/hooks'
import { AssessmentSectionSelectors } from 'client/store/ui/assessmentSection/selectors'

export const useIsDescriptionEditEnabled = (props: {
  sectionName: SectionName
  name: CommentableDescriptionName
}): boolean => {
  const { name, sectionName } = props
  return useAppSelector((state) => AssessmentSectionSelectors.isDescriptionEditEnabled(state, sectionName, name))
}
