import { i18n as i18nType } from 'i18next'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { ODPDataSourceMethod } from 'meta/assessment/originalDataPoint'
import { TableName } from 'meta/assessment/table'
import { RecordTables } from 'meta/assessment/table/record'
import { VariableName } from 'meta/assessment/variable'
import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

// ===== Bulk Download data definition
export type BulkDownloadODPCountryData = {
  countryIso: CountryIso
  dataSourceTypes: Array<ODPDataSourceMethod>
  maxYear: string
  minYear: string
}
export type BulkDownloadODPData = { [key in CountryIso]?: BulkDownloadODPCountryData }

export type BulkDownloadData = {
  descriptions: DescriptionCountryValues
  tables: RecordAssessmentData
  odp: BulkDownloadODPData
}

// with getDatum
type GetDatum = typeof RecordAssessmentDatas.getDatum
export type PropsGetDatum = Omit<Parameters<GetDatum>[0], 'data'> & {
  csvColumn: string
  data: BulkDownloadData
  i18n: i18nType
}
export type BulkDownloadGetDatum = (props: PropsGetDatum) => ReturnType<GetDatum>

// ===== Bulk Download common props definition
export type PropsBulkDownload = {
  assessment: Assessment
  cycle: Cycle
  i18n: i18nType
}

export type PropsBulkDownloadFileBuilder = PropsBulkDownload & {
  includeClimaticDomain?: boolean
  tables: RecordTables
}

// ===== Bulk Download metadata definition
export enum BulkDownloadColType {
  description = 'description',
  odp = 'odp',
  tableNode = 'tableNode',
}

export enum BulkDownloadDatumType {
  number = 'number',
  string = 'string',
  strings = 'strings', // array of strings
}

export type BulkDownloadColNode = {
  colName: ColName
  colType?: BulkDownloadColType // default tableNode
  csvColumn: string
  datumType?: BulkDownloadDatumType // default number
  getDatum?: BulkDownloadGetDatum // custom getDatum function
  tableName: TableName
  variableName: VariableName
}

export type BulkDownloadRow = {
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
  includeFlag?: boolean
}

export type BulkDownloadMetadata = {
  // common metadata
  colForestArea: BulkDownloadColNode
  // files to export
  files: Array<BulkDownloadFile>
}

// ===== Bulk Download CSV types definition
export type CSVContent = { content: string; fileName: string }
export type CSVValue = string | number
export type CSVRow = Array<CSVValue>
export type CSVPostProcessor = (props: { rows: Array<CSVRow> }) => void
export type CSVRowOptions = Pick<BulkDownloadMetadata, 'colForestArea'> &
  Pick<BulkDownloadFile, 'includeClimaticDomain' | 'includeDeskStudy' | 'includeFlag'> &
  Pick<BulkDownloadRow, 'colNodes' | 'colYear'>
