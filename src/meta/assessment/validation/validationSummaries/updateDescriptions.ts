import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { DescriptionValidations } from 'meta/assessment/validation/descriptionValidations'
import { ValidationSummary } from 'meta/assessment/validation/summary'

type Props = {
  descriptionValidations: RecordDescriptionValidations
  sectionNames: Array<SectionName>
  summary: ValidationSummary
}

export const updateDescriptions = (props: Props): void => {
  const { descriptionValidations, sectionNames, summary } = props

  sectionNames.forEach((sectionName) => {
    summary.descriptions[sectionName] = DescriptionValidations.calculateSummary({
      sectionValidations: descriptionValidations[sectionName],
    })
  })
}
