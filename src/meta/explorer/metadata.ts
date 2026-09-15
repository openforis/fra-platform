import { Label } from 'meta/assessment/label'
import { TableName } from 'meta/assessment/table'
import { Dimension, DimensionName } from 'meta/measurement/dimension'
import { Measure, MeasureName } from 'meta/measurement/measure'
import { SystemOfMeasurement, SystemOfMeasurementName } from 'meta/measurement/systemOfMeasurement'

export type ExplorerMeasure = Measure & {
  // label of the table heading row the measure belongs to, e.g. 2b native and introduced tree species
  group?: Label
  // nesting depth from the table row categoryLevel
  level?: number
}

export type ExplorerMetadata = {
  cellsExportAlways: Array<Record<MeasureName, DimensionName>>
  dimensions: Array<Dimension>
  measures: Array<ExplorerMeasure>
  systemsOfMeasurements: Partial<Record<SystemOfMeasurementName, SystemOfMeasurement>>
  tableName: TableName
}
