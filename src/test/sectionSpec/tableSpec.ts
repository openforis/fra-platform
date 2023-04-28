// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { AssessmentType } from '@core/assessment'

import { RowSpec } from './rowSpec'
import { Unit } from './unitSpec'

// TODO: add state type
// TODO: add data and datum type

export type GetSectionData = (
  assessmentType: AssessmentType,
  sectionName: string,
  tableName: string
) => (state: any) => any

export type UpdateTableData = (
  props:
    | { state?: any; rowIdx: number; colIdx: number; value: number | string }
    | { state: any; datum: any; variableName: string }
) => (data: any) => any

export type TableSummarySpec = { assessmentType: AssessmentType; sectionName: string; tableName: string }

export interface TableSpec {
  // base props
  name: string
  rows: Array<RowSpec> // TODO
  odp?: boolean
  odpVariables?: Record<string, string>
  secondary?: boolean
  showOdpChart?: boolean
  tableDataRequired?: Array<TableSummarySpec>
  unit?: Unit
  // print props
  print?: { pageBreakAfter: boolean; colBreakPoints?: Array<number> }
  // data export
  dataExport: boolean
  columnsExport?: Array<string | number>
  columnsExportAlways: Array<string>
  // Functions
  getSectionData: GetSectionData
  isSectionDataEmpty: GetSectionData
  canGenerateValues?: (state: any) => boolean
  updateTableDataCell: UpdateTableData
  migration?: {
    cycles?: Array<string>
    columnNames?: Record<string, Array<string>>
    hidden?: boolean
  }
}
