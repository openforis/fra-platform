import { i18n as i18nType } from 'i18next'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { ODPDataSourceMethod } from 'meta/assessment/originalDataPoint'
import { SectionName } from 'meta/assessment/section'
import { TableName } from 'meta/assessment/table'
import { RecordTables } from 'meta/assessment/table/record'
import { VariableName } from 'meta/assessment/variable'
import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

// ===== Bulk Download data definition
export type BulkDownloadODPCountryData = {
  countryIso: CountryIso
  dataSourceMethods: Array<ODPDataSourceMethod>
  maxYear: string
  minYear: string
}
export type BulkDownloadODPData = { [key in CountryIso]?: BulkDownloadODPCountryData }
export const BulkDownloadODPDataTableName = '___odp_data'

export type BulkDownloadData = RecordAssessmentData & { [BulkDownloadODPDataTableName]: BulkDownloadODPData }
// with custom getDatum
type GetDatum = typeof RecordAssessmentDatas.getDatum
type PropsGetDatum = Omit<Parameters<GetDatum>[0], 'data'> & { csvColumn: string; data: BulkDownloadData }
export type BulkDownloadGetDatum = (props: PropsGetDatum) => ReturnType<GetDatum>

// ===== Bulk Download common props definition
export type PropsBulkDownload = {
  assessment: Assessment
  cycle: Cycle
  i18n: i18nType
}
export type PropsBulkDownloadFileBuilder = PropsBulkDownload & {
  tables: RecordTables
}

// ===== Bulk Download metadata definition
export enum BulkDownloadColNodeType {
  number = 'number',
  string = 'string',
}

/**
 * @deprecated
 */
export type BulkDownloadColVariable = {
  colName: ColName
  csvColumn?: string
}
/**
 * @deprecated
 */
export type BulkDownloadVariable = {
  colName?: ColName
  csvColumn: string
  type?: BulkDownloadColNodeType // default number
  variableName: VariableName
  // custom cols used in single variable file export
  colsVariable?: Array<BulkDownloadColVariable>
}

/**
 * @deprecated
 */
export type BulkDownloadTable = {
  tableName: TableName
  variables: Array<BulkDownloadVariable>
  // custom getDatum processor
  getDatum?: BulkDownloadGetDatum
}

/**
 * @deprecated
 */
export type BulkDownloadYear = {
  fileName: string
  includeDeskStudy?: boolean
  tables: Array<BulkDownloadTable>
  years: Array<string>
}

export type BulkDownloadColDescription = {
  csvColumn?: string
  name: CommentableDescriptionName
  sectionName: SectionName
}

export type BulkDownloadColNode = {
  colName: ColName
  csvColumn: string
  getDatum?: BulkDownloadGetDatum // custom getDatum function
  tableName: TableName
  type?: BulkDownloadColNodeType // default number
  variableName: VariableName
}

export type BulkDownloadRow = {
  colDescriptions?: Array<BulkDownloadColDescription>
  colNodes: Array<BulkDownloadColNode>
  colYear?: string
}

export type BulkDownloadFile = {
  csvPostProcessor?: CSVPostProcessor
  fileName: string
  includeClimaticDomain?: boolean
  includeDeskStudy?: boolean
  includeForestArea?: boolean
  rows: Array<BulkDownloadRow> // rows per country
}

export type BulkDownloadMetadata = {
  // common metadata
  colForestArea: BulkDownloadColNode
  // files to export
  files: Array<BulkDownloadFile>
  /**
   * @deprecated
   */
  tables: RecordTables
  /**
   * exported tables with years
   * @deprecated
   */
  years: Array<BulkDownloadYear>
}

// ===== Bulk Download CSV types definition
export type CSVContent = { content: string; fileName: string }
export type CSVValue = string | number
export type CSVRow = Array<CSVValue>
export type CSVPostProcessor = (props: { rows: Array<CSVRow> }) => void
