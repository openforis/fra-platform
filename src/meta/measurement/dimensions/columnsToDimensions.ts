import { ColName } from 'meta/assessment/col'
import { TableName } from 'meta/assessment/table'
import { DimensionName } from 'meta/measurement/dimension'

// Columns omitted from this map will default to using their own names as dimension names
export const columnToDimensions: Record<TableName, Record<ColName, DimensionName>> = {
  areaOfPermanentForestEstate: {
    applicable: 'areaOfPermanentForestEstateApplicable',
  },

  forestPolicy: {
    national_yes_no: 'forestPolicyNationalYesNo',
    sub_national_yes_no: 'forestPolicySubNationalYesNo',
  },

  growingStockComposition2025: {
    common_name: 'commonName',
    scientific_name: 'scientificName',
  },
}

export const dimensionToColumns: Record<DimensionName, ColName> = Object.values(columnToDimensions).reduce<
  Record<DimensionName, ColName>
>((acc, dimensions) => {
  Object.entries(dimensions).forEach(([columnName, dimensionName]) => {
    acc[dimensionName as DimensionName] = columnName as ColName
  })
  return acc
}, {})
