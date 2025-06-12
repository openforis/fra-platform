import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { useAppSelector } from 'client/store/hooks'
import { CountryReportSelectors } from 'client/store/ui/countryReport/selectors'

export const useIsDescriptionEditEnabled = (props: {
  sectionName: SectionName
  name: CommentableDescriptionName
}): boolean => {
  const { name, sectionName } = props
  return useAppSelector((state) => CountryReportSelectors.isDescriptionEditEnabled(state, sectionName, name))
}
