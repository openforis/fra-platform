import { TableName } from 'meta/assessment/table'
import { Dimension, DimensionName } from 'meta/measurement/dimension'
import { Measure, MeasureName } from 'meta/measurement/measure'

export type ExplorerMetadata = {
  cellsExportAlways: Array<Record<MeasureName, DimensionName>>
  dimensions: Array<Dimension>
  measures: Array<Measure>
  tableName: TableName
}
