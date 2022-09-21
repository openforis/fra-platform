import { Numbers } from '@utils/numbers'

import { CountryIso } from '@meta/area'

import { columnsLegacyMapping } from '@test/dataExportComparison/legacyMapping'
import {
  DataLegacy,
  DataLocal,
  MetadataLegacy,
  TableName,
  ValueDiff,
  VariableName,
} from '@test/dataExportComparison/types'

const skips: Record<TableName, Array<VariableName>> = {
  holderOfManagementRights: [
    'other', // production bug: value not exported
    'totalPublicOwnership', // calculated value. not exported in prod
  ],
  otherLandWithTreeCover: [
    'otherLandWithTreeCoverTotal', // calculated value. not exported in prod
    'otherLand', // calculated value. not exported in prod
  ],
  forestAreaChange: [
    'forestAreaNetChange', // calculated value. not exported in prod
  ],
  forestOwnership: [
    'totalForestArea', // calculated value. not exported in prod
    'other_or_unknown', // production bug: it is exported with the value of totalForestArea
  ],
  disturbances: [
    'totalForestArea', // calculated value. not exported in prod
  ],
  primaryDesignatedManagementObjective: [
    'totalForestArea', // calculated value. not exported in prod
  ],
  growingStockComposition: [
    'total_native_placeholder', // calculated value. not exported in prod
    'totalGrowingStock', // calculated value. not exported in prod
    'totalIntroduced', // calculated value. not exported in prod
  ],
  forestCharacteristics: [
    'forestArea', // calculated value. not exported in prod
    'totalForestArea', // calculated value. not exported in prod
  ],
}

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
  // TODO: valueLocal should not use columnLegacy but column
  const valueLocal = dataLocal?.[countryIso]?.[tableName]?.[columnLegacy]?.[variable]?.raw

  const skipError = skips[tableName] && skips[tableName].includes(variable)

  if (!skipError) {
    const parseValue = (val: string): number => Math.abs(Number(Numbers.toFixed(Number(val))))
    if (Math.abs(parseValue(valueLocal) - parseValue(valueLegacy)) >= 0.01)
      return {
        countryIso,
        tableName,
        variableName: variable,
        colName: column,
        valueLegacy,
        valueLocal,
      }
  }

  return undefined
}
