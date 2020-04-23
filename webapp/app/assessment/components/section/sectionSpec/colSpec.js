import * as R from 'ramda'

import * as NumberUtils from '@common/bignumberUtils'

import { TYPE, TYPES, getType } from './keysType'

export { getType }

export const KEYS_COL = {
  type: TYPE,
  idx: 'idx',
  labelKey: 'labelKey',
  labelParams: 'labelParams',
  label: 'label',
  className: 'className',
  rowSpan: 'rowSpan',
  colSpan: 'colSpan',
  left: 'left',
  calculateFn: 'calculateFn',
  validator: 'validator',
  formatFn: 'formatFn',
  // select
  options: 'options',
  optionsLabelKeyPrefix: 'optionsLabelKeyPrefix',
  optionName: 'optionName',
}

const colHeaderDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.header,
  [KEYS_COL.labelKey]: null,
  [KEYS_COL.labelParams]: {},
  [KEYS_COL.label]: null,
  [KEYS_COL.className]: null,
  [KEYS_COL.rowSpan]: 1,
  [KEYS_COL.colSpan]: 1,
  [KEYS_COL.left]: false,
}

const colDecimalDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.decimal,
}

const colIntegerDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.integer,
}

const colTextDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.text,
}

const colTextAreaDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.textarea,
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

const colSelectDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.select,
  [KEYS_COL.options]: [],
  [KEYS_COL.optionsLabelKeyPrefix]: '',
}

const colSelectYesNoDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.select,
  [KEYS_COL.optionsLabelKeyPrefix]: 'yesNoTextSelect',
  [KEYS_COL.options]: [{ [KEYS_COL.optionName]: 'yes' }, { [KEYS_COL.optionName]: 'no' }],
}

const assocHeaderClassName = (col) => {
  const left = col[KEYS_COL.left]
  let className = 'fra-table__header-cell'
  if (left) className += '-left'
  if (col[KEYS_COL.className]) className += ` ${col[KEYS_COL.className]}`

  return {
    ...R.omit([KEYS_COL.left])(col),
    [KEYS_COL.className]: className,
  }
}

export const newColHeader = R.pipe(R.mergeDeepRight(colHeaderDefault), assocHeaderClassName)

export const newColDecimal = R.pipe(R.defaultTo({}), R.mergeDeepRight(colDecimalDefault))

export const newColInteger = R.pipe(R.defaultTo({}), R.mergeDeepRight(colIntegerDefault))

export const newColCalculated = R.mergeDeepRight(colCalculatedDefault)

export const newColText = R.pipe(R.defaultTo({}), R.mergeDeepRight(colTextDefault))

export const newColTextArea = R.pipe(R.defaultTo({}), R.mergeDeepRight(colTextAreaDefault))

export const newColSelect = R.pipe(R.defaultTo({}), R.mergeDeepRight(colSelectDefault))

export const newColSelectYesNo = R.pipe(R.defaultTo({}), R.mergeDeepRight(colSelectYesNoDefault))

export const newColPlaceholder = R.pipe(R.defaultTo({}), R.mergeDeepRight(colPlaceholderDefault))

export const isReadOnly = R.pipe(R.prop(TYPE), (type) =>
  R.includes(type, [TYPES.calculated, TYPES.header, TYPES.placeholder])
)
