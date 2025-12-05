import { Assessment } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { RecordTables } from 'meta/assessment/table/record'
import { VariableName } from 'meta/assessment/variable'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

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

export type BulkDownloadColVariable = {
  colName: ColName
  csvColumn?: string
}
export type BulkDownloadVariable = {
  colName?: ColName
  csvColumn: string
  type?: BulkDownloadVariableType // default number
  variableName: VariableName
  // custom cols used in single variable file export
  colsVariable?: Array<BulkDownloadColVariable>
}

type GetDatum = typeof RecordAssessmentDatas.getDatum
export type BulkDownloadTable = {
  tableName: TableName
  variables: Array<BulkDownloadVariable>
  // custom getDatum processor
  getDatum?: (props: Parameters<GetDatum>[0] & { csvColumn: string }) => ReturnType<GetDatum>
}

export type BulkDownloadYear = {
  fileName: string
  includeDeskStudy?: boolean
  tables: Array<BulkDownloadTable>
  years: Array<string>
}

export type BulkDownloadForestArea = {
  colName: ColName
  tableName: TableName
  variableName: VariableName
}

export type BulkDownloadFileColumn = {
  colName: ColName
  csvColumn?: string
  tableName: TableName
  type?: BulkDownloadVariableType // default number
  variableName: VariableName
}

export type BulkDownloadFile = {
  columns: Array<BulkDownloadFileColumn>
  fileName: string
  includeClimaticDomain?: boolean
}

export type BulkDownloadMetadata = {
  // common metadata
  forestArea: BulkDownloadForestArea
  tables: RecordTables
  // exported tables with years
  years: Array<BulkDownloadYear>
  // exported generic files
  files: Array<BulkDownloadFile>
}

// ===== Bulk Download CSV definition
export type CSVContent = { content: string; fileName: string }
export type CSVValue = string | number
export type CSVRow = Array<CSVValue>
