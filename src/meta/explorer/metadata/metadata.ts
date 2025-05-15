import { TableName } from 'meta/assessment/table'
import { Dimension } from 'meta/measurement/dimension'
import { Measure } from 'meta/measurement/measure'

export type ExplorerMetadata = {
  dimesions: Array<Dimension>
  measures: Array<Measure>
  systemOfMeasurementName: string
  tableName: TableName
}
