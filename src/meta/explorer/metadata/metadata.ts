import { TableName } from 'meta/assessment/table'
import { Dimension, DimensionName } from 'meta/measurement/dimension'
import { Measure, MeasureName } from 'meta/measurement/measure'
import { SystemOfMeasurementName } from 'meta/measurement/systemOfMeasurement'
import { SystemOfMeasurementWithUnits } from 'meta/measurement/systemOfMeasurement/systemOfMeasurement'

export type ExplorerMetadata = {
  cellsExportAlways: Array<Record<MeasureName, DimensionName>>
  dimensions: Array<Dimension>
  measures: Array<Measure>
  systemsOfMeasurement: Partial<Record<SystemOfMeasurementName, SystemOfMeasurementWithUnits>>
  tableName: TableName
}
