import { ColName } from 'meta/assessment/col'
import { DimensionName } from 'meta/measurement/dimension'
import { dimensionToColumns } from 'meta/measurement/dimensions/columnsToDimensions'

export const dimensionNameToColumnName = (dimensionName: DimensionName): ColName => {
  return dimensionToColumns[dimensionName] ?? dimensionName
}
