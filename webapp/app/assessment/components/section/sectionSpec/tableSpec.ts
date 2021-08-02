import * as R from 'ramda'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import { updateTableDataCell } from '@webapp/app/assessment/components/dataTable/actions'

import { KEYS_ROW } from '@webapp/app/assessment/components/section/sectionSpec/rowSpec'
import { isHeader } from '@webapp/sectionSpec/typeSpec'
/**
 * @deprecated
 */
export const KEYS_TABLE = {
  name: 'name',
  rows: 'rows',
  odp: 'odp',
  odpVariables: 'odpVariables',
  showOdpChart: 'showOdpChart',
  secondary: 'secondary',
  tableDataRequired: 'tableDataRequired',
  unit: 'unit',
  // print props
  print: 'print',
  // Functions
  getSectionData: 'getSectionData',
  isSectionDataEmpty: 'isSectionDataEmpty',
  canGenerateValues: 'canGenerateValues',
  updateTableDataCell: 'updateTableDataCell',
  dataExport: 'dataExport',
  columnsExport: 'columnsExport',
  columnsExportAlways: 'columnsAlwaysExport',
}
/**
 * @deprecated
 */
export const KEYS_TABLE_DATA_REQUIRED = {
  assessmentType: 'assessmentType',
  sectionName: 'sectionName',
  tableName: 'tableName',
}
/**
 * @deprecated
 */
export const KEYS_TABLE_PRINT = {
  colBreakPoints: 'colBreakPoints',
  pageBreakAfter: 'pageBreakAfter',
}
/**
 * @deprecated
 */
const tableDefault: any = {
  [KEYS_TABLE.name]: '',
  [KEYS_TABLE.rows]: [],
  [KEYS_TABLE.secondary]: false,
  [KEYS_TABLE.tableDataRequired]: [],
  [KEYS_TABLE.unit]: null,
  [KEYS_TABLE.print]: { [KEYS_TABLE_PRINT.colBreakPoints]: [], [KEYS_TABLE_PRINT.pageBreakAfter]: false },
  [KEYS_TABLE.getSectionData]: AssessmentState.getSectionData,
  [KEYS_TABLE.isSectionDataEmpty]: AssessmentState.isSectionDataEmpty,
  [KEYS_TABLE.odp]: false,
  [KEYS_TABLE.odpVariables]: {},
  [KEYS_TABLE.showOdpChart]: false,
  [KEYS_TABLE.canGenerateValues]: null,
  [KEYS_TABLE.updateTableDataCell]: updateTableDataCell,
  [KEYS_TABLE.dataExport]: true,
  [KEYS_TABLE.columnsExport]: null,
  [KEYS_TABLE.columnsExportAlways]: [],
}
/**
 * @deprecated
 */
const assocRows = (tableSpec: any) => {
  let idxHeader = -1
  let idxData = -1

  const rows = tableSpec[KEYS_TABLE.rows].map((row: any) => {
    const header = row.type === 'header'
    idxHeader += header ? 1 : 0
    idxData += header ? 0 : 1
    return {
      idx: header ? `header_${idxHeader}` : idxData,
      ...row,
    }
  })

  return {
    ...tableSpec,
    [KEYS_TABLE.rows]: rows,
  }
}
/**
 * @deprecated
 */
export const newTableSpec = R.pipe(R.mergeDeepRight(tableDefault), assocRows)
/**
 * @deprecated
 */
export const getRowsHeader = R.pipe(R.prop(KEYS_TABLE.rows), R.filter(isHeader))
/**
 * @deprecated
 */
export const getRowsData = (tableSpec) => R.pipe(R.prop(KEYS_TABLE.rows), R.reject(isHeader))(tableSpec)
/**
 * @deprecated
 */
export const getName = R.prop(KEYS_TABLE.name)
/**
 * @deprecated
 */
export const getUpdateTableDataCell = (tableSpec: any) => R.prop(KEYS_TABLE.updateTableDataCell)(tableSpec)
/**
 * @deprecated
 */
export const getOdpVariables = R.prop(KEYS_TABLE.odpVariables)
/**
 * @deprecated
 */
export const isOdp = R.propEq(KEYS_TABLE.odp, true)
/**
 * @deprecated
 */
export const isSecondary = R.propEq(KEYS_TABLE.secondary, true)
/**
 * @deprecated
 */
export const getRowsExport = R.pipe(
  getRowsData,
  R.filter((row: any) => !!row[KEYS_ROW.variableExport])
)
/**
 * @deprecated
 */
export const getColumnsExport = R.prop(KEYS_TABLE.columnsExport)
/**
 * @deprecated
 */
export const getColumnsExportAlways = R.prop(KEYS_TABLE.columnsExportAlways)
/**
 * @deprecated
 */
export const getUnit = R.prop(KEYS_TABLE.unit)
