import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

// ===== Bulk Download common props definition
export type PropsBulkDownload = {
  assessment: Assessment
  cycle: Cycle
}

// ===== Bulk Download metadata definition
export enum BulkDownloadVariableType {
  number = 'number',
  string = 'string',
}

export type BulkDownloadVariable = {
  csvColumn: string
  type?: BulkDownloadVariableType // default number
  variableName: VariableName
}

export type BulkDownloadTable = {
  tableName: TableName
  variables: Array<BulkDownloadVariable>
}

export type BulkDownloadYear = {
  fileName: string
  tables: Array<BulkDownloadTable>
  years: Array<string>
}

export type BulkDownloadMetadata = {
  years: Array<BulkDownloadYear>
}

// ===== Bulk Download CSV definition
export type CSVContent = { content: string; fileName: string }
export type CSVValue = string | number
export type CSVRow = Array<CSVValue>
