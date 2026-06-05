import type { DataSourceRowValidations, SectionDescriptionValidations } from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

type Props = {
  current: SectionDescriptionValidations
  update: SectionDescriptionValidations
}

export const mergeLinkValidations = (props: Props): SectionDescriptionValidations => {
  const { current, update } = props
  const value: SectionDescriptionValidations = { ...current }

  // Description validation are replaced entirely with the new state.
  if (!Objects.isEmpty(update.descriptions)) {
    value.descriptions = update.descriptions
  } else {
    delete value.descriptions
  }

  if (Objects.isEmpty(update.dataSources)) return value

  const currentDataSources = current.dataSources ?? {}
  const dataSourcesUpdate = update.dataSources ?? {}

  // For data sources, we update the reference link validation only.
  value.dataSources = Object.entries(dataSourcesUpdate).reduce<DataSourceRowValidations>(
    (acc, [uuid, dataSourceValidation]) => {
      const { reference } = dataSourceValidation
      if (reference) acc[uuid] = { ...acc[uuid], reference }
      return acc
    },
    { ...currentDataSources }
  )

  return value
}
