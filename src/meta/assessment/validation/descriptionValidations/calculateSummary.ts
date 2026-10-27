import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import type { SectionDescriptionValidations } from 'meta/assessment/validation/description'
import type { ValidationSummaryDescription } from 'meta/assessment/validation/summary'

type Props = {
  sectionValidations?: SectionDescriptionValidations
}

export const calculateSummary = (props: Props): ValidationSummaryDescription => {
  const { sectionValidations = {} } = props
  const descriptions = sectionValidations.descriptions ?? {}
  const dataSources = sectionValidations.dataSources ?? {}
  const dataSourcesValid = Object.values(dataSources).every((dataSourceValidation) =>
    Object.values(dataSourceValidation).every((fieldValidation) => fieldValidation?.valid ?? true)
  )

  // Build summary with all descriptions; missing validations are treated as valid.
  return Object.values(CommentableDescriptionName).reduce<ValidationSummaryDescription>((acc, descriptionName) => {
    const textValid = descriptions[descriptionName]?.valid ?? true

    if (descriptionName === CommentableDescriptionName.dataSources) {
      acc[descriptionName] = { valid: textValid && dataSourcesValid }
      return acc
    }

    acc[descriptionName] = { valid: textValid }
    return acc
  }, {} as ValidationSummaryDescription)
}
