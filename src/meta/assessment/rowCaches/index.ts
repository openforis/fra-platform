import { RowCacheKey } from 'meta/assessment/rowCache'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

export const RowCaches = {
  getKey: (props: { tableName: TableName; variableName: VariableName }): RowCacheKey =>
    `${props.tableName}_${props.variableName}`,
}
