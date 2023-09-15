import { TableName } from 'meta/assessment'

export type TableCondition = { variables?: Array<string>; columns?: Array<string> }

export type TablesCondition = Record<TableName, TableCondition>
