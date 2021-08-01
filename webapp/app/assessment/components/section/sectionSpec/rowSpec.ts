import * as R from 'ramda'
import { TYPE, TypeSpec, getType } from '@core/sectionSpec/typeSpec'
import { KEYS_COL } from '@webapp/app/assessment/components/section/sectionSpec/colSpec'

export const KEYS_ROW = {
  type: TYPE,
  cols: 'cols',
  validator: 'validator',
  variableName: 'variableName',
  calculateFn: 'calculateFn',
  chartProps: 'chartProps',
  labelKey: 'labelKey',
  labelPrefixKey: 'labelPrefixKey',
  labelParams: 'labelParams',
  label: 'label',
  // keys of row validation messages
  getValidationMessages: 'getValidationMessages',
  // keys of col header row data
  mainCategory: 'mainCategory',
  subcategory: 'subcategory',
  variableNo: 'variableNo',
  linkToSection: 'linkToSection',
  // keys of col row notice message
  rowSpan: 'rowSpan',
  colSpan: 'colSpan',
  variableExport: 'variableExport',
}

export const KEYS_ROW_CHART = {
  labelKey: 'labelKey',
  color: 'color',
}

const rowHeaderDefault: any = { [KEYS_ROW.type]: TypeSpec.header, [KEYS_ROW.cols]: [] }

const rowDataDefault: any = {
  [KEYS_ROW.type]: TypeSpec.data,
  [KEYS_ROW.cols]: [],
  [KEYS_ROW.validator]: null,
  [KEYS_ROW.variableName]: null,
  [KEYS_ROW.calculateFn]: null,
  [KEYS_ROW.chartProps]: null,
  // col header keys
  [KEYS_ROW.labelKey]: null,
  [KEYS_ROW.labelPrefixKey]: null,
  [KEYS_ROW.labelParams]: {},
  [KEYS_ROW.colSpan]: 1,
  [KEYS_ROW.variableNo]: null,
  [KEYS_ROW.linkToSection]: null,
  [KEYS_ROW.subcategory]: false,
  [KEYS_ROW.mainCategory]: false,
  [KEYS_ROW.variableExport]: null,
}

const rowValidationMessagesDefault: any = {
  [KEYS_ROW.type]: TypeSpec.validationMessages,
  [KEYS_ROW.getValidationMessages]: null,
}

const rowNoticeMessageDefault: any = {
  [KEYS_ROW.type]: TypeSpec.noticeMessage,
  [KEYS_ROW.labelKey]: null,
  [KEYS_ROW.cols]: [],
  [KEYS_ROW.rowSpan]: 1,
  [KEYS_ROW.colSpan]: 1,
}

const assocColHeader = (row: any) => {
  const labelKey = row[KEYS_ROW.labelKey]
  const labelParams = row[KEYS_ROW.labelParams]
  const label = row[KEYS_ROW.label]
  const labelPrefixKey = row[KEYS_ROW.labelPrefixKey]
  const colSpan = row[KEYS_ROW.colSpan]
  const rowSpan = row[KEYS_ROW.rowSpan]
  const variableNo = row[KEYS_ROW.variableNo]
  const linkToSection = row[KEYS_ROW.linkToSection]
  const calculateFn = row[KEYS_ROW.calculateFn]
  const subcategory = row[KEYS_ROW.subcategory]
  const mainCategory = row[KEYS_ROW.mainCategory]
  const cols = [...row[KEYS_ROW.cols]]

  let className = 'fra-table__category-cell'
  className = calculateFn || mainCategory ? 'fra-table__header-cell-left' : className
  className = subcategory ? 'fra-table__subcategory-cell' : className

  const colHeader: any = {
    idx: `header_0`,
    type: TypeSpec.header,
    colSpan,
    rowSpan,
    labelKey,
    labelParams,
    label,
    labelPrefixKey,
    variableNo,
    linkToSection,
    className,
  }
  cols.splice(0, 0, colHeader)

  return {
    ...R.pick([
      KEYS_ROW.type,
      KEYS_ROW.cols,
      KEYS_ROW.validator,
      KEYS_ROW.variableName,
      KEYS_ROW.calculateFn,
      KEYS_ROW.chartProps,
      KEYS_ROW.variableExport,
    ])(row),
    [KEYS_ROW.cols]: cols,
  }
}

const assocCols = (row: any) => {
  const cols = row[KEYS_ROW.cols].map((col: any, i: any) => ({
    ...col,
    [KEYS_COL.idx]: R.defaultTo(i, col[KEYS_COL.idx]),
  }))
  return { ...row, [KEYS_ROW.cols]: cols }
}

const assocColNoticeMessage = (row: any) => {
  const labelKey = row[KEYS_ROW.labelKey]
  const rowSpan = row[KEYS_ROW.rowSpan]
  const colSpan = row[KEYS_ROW.colSpan]
  const cols = [{ labelKey, rowSpan, colSpan }]
  return {
    ...R.pick([KEYS_ROW.type])(row),
    [KEYS_ROW.cols]: cols,
  }
}

export const newRowHeader = R.pipe(R.mergeDeepRight(rowHeaderDefault), assocCols)

export const newRowData = R.pipe(R.mergeDeepRight(rowDataDefault), assocCols, assocColHeader)

export const newRowNoticeMessage = R.pipe(R.mergeDeepRight(rowNoticeMessageDefault), assocColNoticeMessage)

export const newRowValidationMessages = R.mergeDeepRight(rowValidationMessagesDefault)

export { getType, TypeSpec }
export const getCols = R.propOr([], KEYS_ROW.cols)
export const getColByIdx = (idx: any) => R.pipe(getCols, R.find(R.propEq(KEYS_COL.idx, idx)))
