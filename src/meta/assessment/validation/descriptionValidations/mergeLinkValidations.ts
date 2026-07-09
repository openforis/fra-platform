import type { DataSourceRowValidations, SectionDescriptionValidations } from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

type Props = {
  current: SectionDescriptionValidations
  replaceDescriptions?: boolean
  update: SectionDescriptionValidations
}

export const mergeLinkValidations = (props: Props): SectionDescriptionValidations => {
  const { current, replaceDescriptions = false, update } = props
  const value: SectionDescriptionValidations = { ...current }

  if (replaceDescriptions) {
    // A full check goes over every description, so we replace the whole set and drop anything that's gone.
    if (!Objects.isEmpty(update.descriptions)) {
      value.descriptions = update.descriptions
    } else {
      delete value.descriptions
    }
  } else if (!Objects.isEmpty(current.descriptions) || !Objects.isEmpty(update.descriptions)) {
    // A single edit only touches the descriptions that changed, so we merge those in and keep the rest.
    value.descriptions = { ...current.descriptions, ...update.descriptions }
    if (Objects.isEmpty(value.descriptions)) delete value.descriptions
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
