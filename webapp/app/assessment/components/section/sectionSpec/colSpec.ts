// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'

import { TYPE, TYPES, getType } from './keysType'

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

// @ts-expect-error ts-migrate(7005) FIXME: Variable 'colHeaderDefault' implicitly has an '{ [... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(7005) FIXME: Variable 'colDecimalDefault' implicitly has an '{ ... Remove this comment to see the full error message
const colDecimalDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.decimal,
}

// @ts-expect-error ts-migrate(7005) FIXME: Variable 'colIntegerDefault' implicitly has an '{ ... Remove this comment to see the full error message
const colIntegerDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.integer,
}

// @ts-expect-error ts-migrate(7005) FIXME: Variable 'colTextDefault' implicitly has an '{ [x:... Remove this comment to see the full error message
const colTextDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.text,
}

// @ts-expect-error ts-migrate(7005) FIXME: Variable 'colTextAreaDefault' implicitly has an '{... Remove this comment to see the full error message
const colTextAreaDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.textarea,
}

// @ts-expect-error ts-migrate(7005) FIXME: Variable 'colCalculatedDefault' implicitly has an ... Remove this comment to see the full error message
const colCalculatedDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.calculated,
  [KEYS_COL.formatFn]: NumberUtils.formatNumber,
}

// @ts-expect-error ts-migrate(7005) FIXME: Variable 'colPlaceholderDefault' implicitly has an... Remove this comment to see the full error message
const colPlaceholderDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.placeholder,
}

// @ts-expect-error ts-migrate(7005) FIXME: Variable 'colSelectDefault' implicitly has an '{ [... Remove this comment to see the full error message
const colSelectDefault = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TYPES.select,
  [KEYS_COL.options]: [],
  [KEYS_COL.optionsLabelKeyPrefix]: '',
}

// @ts-expect-error ts-migrate(7005) FIXME: Variable 'colSelectYesNoDefault' implicitly has an... Remove this comment to see the full error message
const colSelectYesNoDefault = {
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

export const newColHeader = R.pipe(R.mergeDeepRight(colHeaderDefault), assocHeaderClassName)
export const newColDecimal = R.pipe(R.defaultTo({}), R.mergeDeepRight(colDecimalDefault))
export const newColInteger = R.pipe(R.defaultTo({}), R.mergeDeepRight(colIntegerDefault))
export const newColCalculated = R.mergeDeepRight(colCalculatedDefault)
export const newColText = R.pipe(R.defaultTo({}), R.mergeDeepRight(colTextDefault))
export const newColTextArea = R.pipe(R.defaultTo({}), R.mergeDeepRight(colTextAreaDefault))
export const newColSelect = R.pipe(R.defaultTo({}), R.mergeDeepRight(colSelectDefault))
export const newColSelectYesNo = R.pipe(R.defaultTo({}), R.mergeDeepRight(colSelectYesNoDefault))
export const newColPlaceholder = R.pipe(R.defaultTo({}), R.mergeDeepRight(colPlaceholderDefault))

export { getType, TYPES }
export const getIdx = R.prop(KEYS_COL.idx)
export const getOptions = R.prop(KEYS_COL.options)
export const isReadOnly = R.pipe(R.prop(TYPE), (type: any) =>
  R.includes(type, [TYPES.calculated, TYPES.header, TYPES.placeholder])
)
