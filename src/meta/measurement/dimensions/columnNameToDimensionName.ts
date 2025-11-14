import { ColName } from 'meta/assessment/col'
import { TableName } from 'meta/assessment/table'
import { DimensionName } from 'meta/measurement/dimension'
import { columnToDimensions } from 'meta/measurement/dimensions/columnsToDimensions'

export const columnNameToDimensionName = (tableName: TableName, columnName: ColName): DimensionName | ColName => {
  return columnToDimensions[tableName]?.[columnName] ?? columnName
}
