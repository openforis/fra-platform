import * as R from 'ramda'
import { TYPE, TYPES, isCalculated } from '@webapp/app/assessment/components/section/sectionSpec/keysType'

export const KEYS_ROW = {
  type: TYPE,
  cols: 'cols',
  validator: 'validator',
  variableName: 'variableName',
  calculateFn: 'calculateFn',
  chartProps: 'chartProps',
  labelKey: 'labelKey',
  // keys of row validation messages
  getValidationMessages: 'getValidationMessages',
  // keys of col header row data
  subcategory: 'subcategory',
  variableNo: 'variableNo',
  linkToSection: 'linkToSection',
  // keys of col row notice message
  rowSpan: 'rowSpan',
  colsSpan: 'colSpan',
}

export const KEYS_ROW_CHART = {
  labelKey: 'labelKey',
  color: 'color',
}

const rowHeaderDefault = { [KEYS_ROW.type]: TYPES.header, [KEYS_ROW.cols]: [] }

const rowDataDefault = {
  [KEYS_ROW.type]: TYPES.data,
  [KEYS_ROW.cols]: [],
  [KEYS_ROW.validator]: null,
  [KEYS_ROW.variableName]: null,
  [KEYS_ROW.calculateFn]: null,
  [KEYS_ROW.chartProps]: null,
  // col header keys
  [KEYS_ROW.labelKey]: null,
  [KEYS_ROW.variableNo]: null,
  [KEYS_ROW.linkToSection]: null,
  [KEYS_ROW.subcategory]: false,
}

const rowValidationMessagesDefault = {
  [KEYS_ROW.type]: TYPES.validationMessages,
  [KEYS_ROW.getValidationMessages]: null,
}

const rowNoticeMessageDefault = {
  [KEYS_ROW.type]: TYPES.noticeMessage,
  [KEYS_ROW.labelKey]: null,
  [KEYS_ROW.cols]: [],
  [KEYS_ROW.rowSpan]: 1,
  [KEYS_ROW.colsSpan]: 1,
}

const assocColHeader = row => {
  const labelKey = row[KEYS_ROW.labelKey]
  const variableNo = row[KEYS_ROW.variableNo]
  const linkToSection = row[KEYS_ROW.linkToSection]
  const calculateFn = row[KEYS_ROW.calculateFn]
  const subcategory = row[KEYS_ROW.subcategory]
  const cols = [...row[KEYS_ROW.cols]]

  let className = 'fra-table__category-cell'
  className = calculateFn ? 'fra-table__header-cell-left' : className
  className = subcategory ? 'fra-table__subcategory-cell' : className

  const colHeader = {
    idx: `header_0`,
    type: 'header',
    labelKey,
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
    ])(row),
    [KEYS_ROW.cols]: cols,
  }
}

const assocCols = row => {
  let idxCalculated = -1
  let idxData = -1

  const cols = row[KEYS_ROW.cols].map(col => {
    const calculated = isCalculated(col)
    idxCalculated += calculated ? 1 : 0
    idxData += calculated ? 0 : 1

    return {
      idx: calculated ? `calculated_${idxCalculated}` : idxData,
      ...col,
    }
  })

  return { ...row, [KEYS_ROW.cols]: cols }
}

const assocColNoticeMessage = row => {
  const labelKey = row[KEYS_ROW.labelKey]
  const rowSpan = row[KEYS_ROW.rowSpan]
  const colSpan = row[KEYS_ROW.colsSpan]
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
