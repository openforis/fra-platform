import { Row, VariableName } from 'meta/assessment/row'
import { SectionName } from 'meta/assessment/section'
import { TableName } from 'meta/assessment/table'

export interface RowCache extends Row {
  sectionName: SectionName
  tableName: TableName
}

export type RowCacheKey = string

export type RecordRowCache = Record<RowCacheKey, RowCache>

export const RowCaches = {
  getKey: (props: { tableName: TableName; variableName: VariableName }): RowCacheKey =>
    `${props.tableName}_${props.variableName}`,
}
