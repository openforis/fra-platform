import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { updateDescriptionTextValidations } from './updateDescriptionTextValidations'

type DescriptionValidationUpdate = {
  descriptionName: CommentableDescriptionName
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
  const { assessment, cycle, descriptions } = props

  descriptions.forEach((description) => {
    updateDescriptionTextValidations({ assessment, cycle, ...description })

    // TODO: Validate data sources and store results under sectionValidations.dataSources.
  })
}
