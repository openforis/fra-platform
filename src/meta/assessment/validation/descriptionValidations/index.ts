import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import type { DataSourceRowValidations, SectionDescriptionValidations } from 'meta/assessment/validation/description'
import type { ValidationSummaryDescription } from 'meta/assessment/validation/summary'
import { Objects } from 'utils/objects'

type MergeValidationsProps = {
  current: SectionDescriptionValidations
  update: SectionDescriptionValidations
}

// Merges an incoming validation update onto a section's current validations and returns the result.
// Example:
//   current: { reference: { valid: false }, year: { valid: true } }
//   update:  { year: { valid: false } }
//   result:  { reference: { valid: false }, year: { valid: false } }
const mergeValidations = (props: MergeValidationsProps): SectionDescriptionValidations => {
  const { current, update } = props
  const value: SectionDescriptionValidations = { ...current }

  // Update description text validations if present.
  if (!Objects.isEmpty(current.descriptions) || !Objects.isEmpty(update.descriptions)) {
    value.descriptions = { ...current.descriptions, ...update.descriptions }
  }

  // Update dataSources if present.
  if (!('dataSources' in update)) return value

  // Empty dataSources means every source row validation was removed, so we drop them.
  if (Objects.isEmpty(update.dataSources)) {
    delete value.dataSources
    return value
  }

  const currentDataSources = current.dataSources ?? {}
  const dataSourcesUpdate = update.dataSources ?? {}

  value.dataSources = Object.entries(dataSourcesUpdate).reduce<DataSourceRowValidations>(
    (acc, [uuid, dataSourceValidation]) => {
      acc[uuid] = { ...currentDataSources[uuid], ...dataSourceValidation }
      return acc
    },
    {}
  )

  return value
}

type CalculateSummaryProps = {
  sectionValidations?: SectionDescriptionValidations
}

const calculateSummary = (props: CalculateSummaryProps): ValidationSummaryDescription => {
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

export const DescriptionValidations = {
  mergeValidations,
  calculateSummary,
}
