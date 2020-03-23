import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import {
  acceptNextDecimal,
  acceptableAsDecimal,
  acceptNextInteger,
  acceptableAsInteger,
} from '@webapp/utils/numberInput'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import { ThousandSeparatedIntegerInput } from '@webapp/components/thousandSeparatedIntegerInput'

const Number = props => {
  const { assessmentType, sectionName, tableName, updateTableDataCell, rowIdx, col, datum, disabled } = props
  const { type } = col
  const dispatch = useDispatch()

  const [Component, acceptNexValue, acceptableAsValue, valueProps] =
    type === SectionSpec.TYPES.decimal
      ? [ThousandSeparatedDecimalInput, acceptNextDecimal, acceptableAsDecimal, { numberValue: datum }]
      : [ThousandSeparatedIntegerInput, acceptNextInteger, acceptableAsInteger, { integerValue: datum }]

  const onChange = e => {
    const { value } = e.target
    if (acceptableAsValue(value)) {
      let valueUpdate = acceptNexValue(value, datum)
      valueUpdate = valueUpdate && String(valueUpdate)

      dispatch(updateTableDataCell(assessmentType, sectionName, tableName, rowIdx, col.idx, valueUpdate))
    }
  }
  const onPaste = () => {
    // TODO
  }

  return React.createElement(Component, { ...valueProps, onChange, onPaste, disabled })
}

Number.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  rowIdx: PropTypes.number.isRequired,
  col: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  datum: PropTypes.any,
  updateTableDataCell: PropTypes.func.isRequired,
}

Number.defaultProps = {
  datum: null,
}

export default Number
