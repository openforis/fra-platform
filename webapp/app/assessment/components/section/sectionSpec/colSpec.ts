import * as R from 'ramda'

import * as NumberUtils from '@common/bignumberUtils'

import { TYPE, TYPES, getType } from './keysType'

export const KEYS_COL: any = {
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

const colHeaderDefault: any = {
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

const colDecimalDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.decimal,
}

const colIntegerDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.integer,
}

const colTextDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.text,
}

const colTextAreaDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.textarea,
}

const colCalculatedDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.calculated,
  [KEYS_COL.formatFn]: NumberUtils.formatNumber,
}

const colPlaceholderDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.placeholder,
}

const colSelectDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.select,
  [KEYS_COL.options]: [],
  [KEYS_COL.optionsLabelKeyPrefix]: '',
}

const colSelectYesNoDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.select,
  [KEYS_COL.optionsLabelKeyPrefix]: 'yesNoTextSelect',
  [KEYS_COL.options]: [{ [KEYS_COL.optionName]: 'yes' }, { [KEYS_COL.optionName]: 'no' }],
}

const assocHeaderClassName = (col: any) => {
  const left = col[KEYS_COL.left]
  let className = 'fra-table__header-cell'
  if (left) className += '-left'
  if (col[KEYS_COL.className]) className += ` ${col[KEYS_COL.className]}`

  return {
    ...R.omit([KEYS_COL.left])(col),
    [KEYS_COL.className]: className,
  }
}

export const newColHeader = (x?: any) => R.pipe(R.mergeDeepRight(colHeaderDefault), assocHeaderClassName)(x)
// @ts-ignore
export const newColDecimal = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colDecimalDefault))(x)
export const newColInteger = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colIntegerDefault))(x)
export const newColCalculated = (x?: any) => R.mergeDeepRight(colCalculatedDefault)(x)
export const newColText = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colTextDefault))(x)
export const newColTextArea = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colTextAreaDefault))(x)
export const newColSelect = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colSelectDefault))(x)
export const newColSelectYesNo = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colSelectYesNoDefault))(x)
export const newColPlaceholder = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colPlaceholderDefault))(x)

export { getType, TYPES }
export const getIdx = R.prop(KEYS_COL.idx)
export const getOptions = R.prop(KEYS_COL.options)
export const isReadOnly = R.pipe(R.prop(TYPE), (type: any) =>
  R.includes(type, [TYPES.calculated, TYPES.header, TYPES.placeholder])
)
