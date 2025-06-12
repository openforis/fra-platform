import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { useAppSelector } from 'client/store/hooks'
import { CountryReportSelector } from 'client/store/ui/countryReport/selectors'

export const useIsDescriptionEditEnabled = (props: {
  sectionName: SectionName
  name: CommentableDescriptionName
}): boolean => {
  const { name, sectionName } = props
  return useAppSelector((state) => CountryReportSelector.isDescriptionEditEnabled(state, sectionName, name))
}
