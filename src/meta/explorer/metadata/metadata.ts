import { TableName } from 'meta/assessment/table'
import { Dimension } from 'meta/measurement/dimension'
import { Measure } from 'meta/measurement/measure'

export type ExplorerMetadata = {
  dimensions: Array<Dimension>
  measures: Array<Measure>
  tableName: TableName
}
