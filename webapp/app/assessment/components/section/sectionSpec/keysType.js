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
  select: 'select',
  placeholder: 'placeholder',
}

const _isType = type => R.propEq(TYPE, type)

export const isCalculated = _isType(TYPES.calculated)
