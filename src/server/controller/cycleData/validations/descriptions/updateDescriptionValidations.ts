import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { updateDescriptionTextValidations } from './updateDescriptionTextValidations'

type DescriptionValidationUpdate = {
  descriptionName: CommentableDescriptionName
  id: number
  sectionName: SectionName
  value: CommentableDescriptionValue
}

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<DescriptionValidationUpdate>
}

export const updateDescriptionValidations = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptions } = props

  await updateDescriptionTextValidations({ assessment, country, cycle, descriptions })

  // TODO: Validate data sources and store results under sectionValidations.dataSources.
}
