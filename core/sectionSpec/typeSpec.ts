import * as R from 'ramda'

export const TYPE = 'type'

export enum TypeSpec {
  header = 'header',
  data = 'data',
  noticeMessage = 'noticeMessage',
  validationMessages = 'validationMessages',
  calculated = 'calculated',
  decimal = 'decimal',
  integer = 'integer',
  text = 'text',
  textarea = 'textarea',
  select = 'select',
  selectYesNo = 'selectYesNo',
  placeholder = 'placeholder',
}

/**
 * @deprecated
 */
export const getType = R.prop(TYPE)

/**
 * @deprecated
 */
const _isType = (type: any) => R.propEq(TYPE, type)
/**
 * @deprecated
 */
const _isNotType = (type: any) => R.pipe(_isType(type), R.not)

/**
 * @deprecated
 */
export const isCalculated = _isType(TypeSpec.calculated)
/**
 * @deprecated
 */
export const isData = _isType(TypeSpec.data)
/**
 * @deprecated
 */
export const isNotData = _isNotType(TypeSpec.data)
/**
 * @deprecated
 */
export const isHeader = _isType(TypeSpec.header)
/**
 * @deprecated
 */
export const isNotHeader = _isNotType(TypeSpec.header)
/**
 * @deprecated
 */
export const isDecimal = _isType(TypeSpec.decimal)
/**
 * @deprecated
 */
export const isText = _isType(TypeSpec.text)
