import React from 'react'
import PropTypes from 'prop-types'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import { ThousandSeparatedIntegerInput } from '@webapp/components/thousandSeparatedIntegerInput'
import useOnChange from './useOnChange'

const Number = (props) => {
  const { assessmentType, sectionName, tableName, updateTableDataCell, rowIdx, col, datum, disabled } = props
  const onChange = useOnChange({ assessmentType, sectionName, tableName, updateTableDataCell, rowIdx, col, datum })

  const [Component, componentProps] = SectionSpec.isDecimal(col)
    ? [ThousandSeparatedDecimalInput, { numberValue: datum }]
    : [ThousandSeparatedIntegerInput, { integerValue: datum }]

  return React.createElement(Component, { ...componentProps, onChange, disabled })
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
