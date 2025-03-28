import { TableName } from 'meta/assessment/table'

export type TableCondition = { variables?: Array<string>; columns?: Array<string> }

export type TablesCondition = Record<TableName, TableCondition>
