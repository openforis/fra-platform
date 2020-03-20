import * as R from 'ramda'

import * as NumberUtils from '@common/bignumberUtils'

import { TYPE, TYPES } from '@webapp/app/assessment/components/section/sectionSpec/keysType'

export const KEYS_COL = {
  type: TYPE,
  idx: 'idx',
  labelKey: 'labelKey',
  label: 'label',
  className: 'className',
  rowSpan: 'rowSpan',
  colSpan: 'colSpan',
  left: 'left',
  calculateFn: 'calculateFn',
  validator: 'validator',
  formatFn: 'formatFn',
}

const colHeaderDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.header,
  [KEYS_COL.labelKey]: null,
  [KEYS_COL.label]: null,
  [KEYS_COL.className]: '',
  [KEYS_COL.rowSpan]: 1,
  [KEYS_COL.colSpan]: 1,
  [KEYS_COL.left]: false,
}

const colDecimalDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.decimal,
}

const colTextDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.text,
}

const colCalculatedDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.calculated,
  [KEYS_COL.formatFn]: NumberUtils.formatNumber,
}

const colPlaceholderDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.placeholder,
}

const assocHeaderClassName = col => {
  const left = col[KEYS_COL.left]
  const className = `fra-table__header-cell${left ? '-left' : ''}`
  return {
    ...R.omit([KEYS_COL.left])(col),
    [KEYS_COL.className]: className,
  }
}

export const newColHeader = R.pipe(R.mergeDeepRight(colHeaderDefault), assocHeaderClassName)

export const newColDecimal = R.pipe(R.defaultTo({}), R.mergeDeepRight(colDecimalDefault))

export const newColCalculated = R.mergeDeepRight(colCalculatedDefault)

export const newColText = R.pipe(R.defaultTo({}), R.mergeDeepRight(colTextDefault))

export const newColPlaceholder = R.pipe(R.defaultTo({}), R.mergeDeepRight(colPlaceholderDefault))
