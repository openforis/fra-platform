import type {
  DataSourceRowValidations,
  DescriptionTextValidations,
  SectionDescriptionValidations,
} from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

type Props = {
  current: SectionDescriptionValidations
  // True when the whole section was revalidated, so all validations are replaced by the incoming update.
  isCompleteUpdate?: boolean
  update: SectionDescriptionValidations
}

const _mergeDescriptionValidations = (props: Props): DescriptionTextValidations => {
  const { current, isCompleteUpdate, update } = props

  // If the entire section was revalidated, we use the entire update.
  if (isCompleteUpdate) return update.descriptions ?? {}

  // Otherwise, we merge the edited descriptions in and keep the rest.
  return { ...current.descriptions, ...update.descriptions }
}

const _mergeDataSourceValidations = (props: Props): DataSourceRowValidations => {
  const { current, isCompleteUpdate, update } = props

  // If a partial update didn't validate the data sources, we keep the current validations as they are.
  const dataSourcesValidated = 'dataSources' in update
  if (!isCompleteUpdate && !dataSourcesValidated) return current.dataSources ?? {}

  const currentDataSources = current.dataSources ?? {}
  const dataSourcesUpdate = update.dataSources ?? {}

  // We only keep the rows present in the update; rows missing from it were deleted.
  // For each row, we replace the reference link validation only and keep its other validations.
  return Object.entries(dataSourcesUpdate).reduce<DataSourceRowValidations>((acc, [uuid, dataSourceValidation]) => {
    const mergedValidation = { ...currentDataSources[uuid] }
    delete mergedValidation.reference

    const { reference } = dataSourceValidation
    if (!Objects.isEmpty(reference)) mergedValidation.reference = reference
    if (!Objects.isEmpty(mergedValidation)) acc[uuid] = mergedValidation

    return acc
  }, {})
}

// Merges a link validation update into a section's current validations and returns the result.
export const mergeLinkValidations = (props: Props): SectionDescriptionValidations => {
  const { current, isCompleteUpdate = false, update } = props

  const value: SectionDescriptionValidations = {}

  const descriptions = _mergeDescriptionValidations({ current, isCompleteUpdate, update })
  if (!Objects.isEmpty(descriptions)) value.descriptions = descriptions

  const dataSources = _mergeDataSourceValidations({ current, isCompleteUpdate, update })
  if (!Objects.isEmpty(dataSources)) value.dataSources = dataSources

  return value
}
