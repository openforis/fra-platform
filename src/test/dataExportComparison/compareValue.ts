import { CountryIso } from '@meta/area'

import { columnsLegacyMapping } from '@test/dataExportComparison/legacyMapping'
import { DataLegacy, DataLocal, MetadataLegacy, ValueDiff } from '@test/dataExportComparison/types'

export const compareValue = (props: {
  metadataLegacy: MetadataLegacy
  tableName: string
  column: string
  variable: string
  countryIso: CountryIso
  dataLegacy: DataLegacy
  dataLocal: DataLocal
}): ValueDiff | undefined => {
  const { metadataLegacy, tableName, column, variable, countryIso, dataLegacy, dataLocal } = props
  const variablesLegacy = metadataLegacy[tableName].variables
  const variableLegacy = variablesLegacy.find((v) => v.name === variable)?.exportName ?? variable
  const columnLegacy = columnsLegacyMapping[tableName]?.[column] ?? column

  const valueLegacy = dataLegacy?.[countryIso]?.[variableLegacy]?.[columnLegacy]
  const valueLocal = dataLocal?.[countryIso]?.[tableName]?.[column]?.[variable]?.raw

  let skipError = false
  if (tableName === 'holderOfManagementRights' && ['other', 'totalPublicOwnership'].includes(variable) && !valueLegacy)
    skipError = true
  if (
    tableName === 'otherLandWithTreeCover' &&
    ['otherLandWithTreeCoverTotal', 'otherLand'].includes(variable) &&
    !valueLegacy
  )
    skipError = true

  let valueDiff: ValueDiff
  if (!skipError && valueLegacy !== valueLocal) {
    valueDiff = {
      countryIso,
      tableName,
      variableName: variable,
      colName: column,
      valueLegacy,
      valueLocal,
    }
  }
  return valueDiff
}
