import type { DataSourceRowValidations, SectionDescriptionValidations } from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

type Props = {
  current: SectionDescriptionValidations
  update: SectionDescriptionValidations
}

// Merges an incoming validation update onto a section's current validations and returns the result.
// Example:
//   current: { reference: { valid: false }, year: { valid: true } }
//   update:  { year: { valid: false } }
//   result:  { reference: { valid: false }, year: { valid: false } }
export const mergeValidations = (props: Props): SectionDescriptionValidations => {
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
