import * as R from 'ramda'

import * as NumberUtils from '@common/bignumberUtils'

import { TYPE, TypeSpec, getType } from '@webapp/sectionSpec/typeSpec'

/**
 * @deprecated
 */
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

/**
 * @deprecated
 */
const colHeaderDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TypeSpec.header,
  [KEYS_COL.labelKey]: null,
  [KEYS_COL.labelParams]: {},
  [KEYS_COL.label]: null,
  [KEYS_COL.className]: null,
  [KEYS_COL.rowSpan]: 1,
  [KEYS_COL.colSpan]: 1,
  [KEYS_COL.left]: false,
}

/**
 * @deprecated
 */
const colDecimalDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TypeSpec.decimal,
}

/**
 * @deprecated
 */
const colIntegerDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TypeSpec.integer,
}

/**
 * @deprecated
 */
const colTextDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TypeSpec.text,
}

/**
 * @deprecated
 */
const colTextAreaDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TypeSpec.textarea,
}

/**
 * @deprecated
 */
const colCalculatedDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TypeSpec.calculated,
  [KEYS_COL.formatFn]: NumberUtils.formatNumber,
}

/**
 * @deprecated
 */
const colPlaceholderDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TypeSpec.placeholder,
}

/**
 * @deprecated
 */
const colSelectDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TypeSpec.select,
  [KEYS_COL.options]: [],
  [KEYS_COL.optionsLabelKeyPrefix]: '',
}

/**
 * @deprecated
 */
const colSelectYesNoDefault: any = {
  [KEYS_COL.idx]: null,
  [KEYS_COL.type]: TypeSpec.select,
  [KEYS_COL.optionsLabelKeyPrefix]: 'yesNoTextSelect',
  [KEYS_COL.options]: [{ [KEYS_COL.optionName]: 'yes' }, { [KEYS_COL.optionName]: 'no' }],
}

/**
 * @deprecated
 */
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

/**
 * @deprecated
 */
export const newColHeader = (x?: any) => R.pipe(R.mergeDeepRight(colHeaderDefault), assocHeaderClassName)(x)
/**
 * @deprecated
 */
// @ts-ignore
export const newColDecimal = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colDecimalDefault))(x)
/**
 * @deprecated
 */
export const newColInteger = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colIntegerDefault))(x)
/**
 * @deprecated
 */
export const newColCalculated = (x?: any) => R.mergeDeepRight(colCalculatedDefault)(x)
/**
 * @deprecated
 */
export const newColText = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colTextDefault))(x)
/**
 * @deprecated
 */
export const newColTextArea = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colTextAreaDefault))(x)
/**
 * @deprecated
 */
export const newColSelect = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colSelectDefault))(x)
/**
 * @deprecated
 */
export const newColSelectYesNo = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colSelectYesNoDefault))(x)
/**
 * @deprecated
 */
export const newColPlaceholder = (x?: any) => R.pipe(R.defaultTo({}), R.mergeDeepRight(colPlaceholderDefault))(x)

export { getType, TypeSpec }
export const getIdx = R.prop(KEYS_COL.idx)
export const getOptions = R.prop(KEYS_COL.options)
export const isReadOnly = R.pipe(R.prop(TYPE), (type: any) =>
  R.includes(type, [TypeSpec.calculated, TypeSpec.header, TypeSpec.placeholder])
)
