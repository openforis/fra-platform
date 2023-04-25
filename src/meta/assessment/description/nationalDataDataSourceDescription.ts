import { DataSourceColumn } from '@meta/assessment/description/dataSourceColumn'
import { DataSourceVariables } from '@meta/assessment/description/dataSourceVariables'

export interface NationalDataDataSourceDescription {
  table?: { columns: Array<DataSourceColumn>; dataSourceVariables?: DataSourceVariables }
  text?: { readOnly?: boolean }
}
