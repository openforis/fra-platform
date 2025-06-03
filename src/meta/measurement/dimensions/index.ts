import { ColName } from 'meta/assessment/col'
import { TableName } from 'meta/assessment/table'
import { DimensionName } from 'meta/measurement/dimension/dimension'

import { columnToDimensions, dimensionToColumns } from './columnsToDimensions'

const columnNameToDimensionName = (tableName: TableName, columnName: ColName): DimensionName | ColName => {
  return columnToDimensions[tableName]?.[columnName] ?? columnName
}

const dimensionNameToColumnName = (dimensionName: DimensionName): ColName => {
  return dimensionToColumns[dimensionName] ?? dimensionName
}

const getTName = (name: DimensionName): string => `dimensions.${name}`

export const Dimensions = {
  columnNameToDimensionName,
  dimensionNameToColumnName,
  getTName,
}
