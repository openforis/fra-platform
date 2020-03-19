import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { acceptNextDecimal } from '@webapp/utils/numberInput'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'

const Decimal = props => {
  const { assessmentType, sectionName, tableName, updateTableDataCell, rowIdx, col, datum, disabled } = props

  const dispatch = useDispatch()

  return (
    <ThousandSeparatedDecimalInput
      numberValue={datum}
      onChange={e => {
        const { value } = e.target
        let valueUpdate = acceptNextDecimal(value, datum)
        valueUpdate = valueUpdate && String(valueUpdate)

        dispatch(updateTableDataCell(assessmentType, sectionName, tableName, rowIdx, col.idx, valueUpdate))
      }}
      onPaste={() => {
        // TODO
      }}
      disabled={disabled}
    />
  )
}

Decimal.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  rowIdx: PropTypes.number.isRequired,
  col: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  datum: PropTypes.any,
  updateTableDataCell: PropTypes.func.isRequired,
}

Decimal.defaultProps = {
  datum: null,
}

export default Decimal
