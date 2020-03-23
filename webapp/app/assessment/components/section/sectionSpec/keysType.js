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

const _isType = type => R.propEq(TYPE, type)

export const isCalculated = _isType(TYPES.calculated)
