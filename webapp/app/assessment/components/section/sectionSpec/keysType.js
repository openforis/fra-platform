import * as R from 'ramda'

export const TYPE = 'type'

export const TYPES = {
  header: 'header',
  data: 'data',
  noticeMessage: 'noticeMessage',
  validationMessages: 'validationMessages',
  calculated: 'calculated',
  decimal: 'decimal',
  integer: 'integer',
  text: 'text',
  textarea: 'textarea',
  select: 'select',
  selectYesNo: 'selectYesNo',
  placeholder: 'placeholder',
}

export const getType = R.prop(TYPE)

const _isType = (type) => R.propEq(TYPE, type)
const _isNotType = (type) => R.pipe(_isType(type), R.not)

export const isCalculated = _isType(TYPES.calculated)
export const isData = _isType(TYPES.data)
export const isNotData = _isNotType(TYPES.data)
export const isHeader = _isType(TYPES.header)
export const isNotHeader = _isNotType(TYPES.header)
export const isDecimal = _isType(TYPES.decimal)
export const isText = _isType(TYPES.text)
