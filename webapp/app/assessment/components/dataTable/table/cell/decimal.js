import React from 'react'
import PropTypes from 'prop-types'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'

const Decimal = props => {

  const { datum, disabled } = props

  return (
    <ThousandSeparatedDecimalInput
      numberValue={datum}
      // onPaste={e =>
      // dispatch(
      // saveMany(sectionName, countryIso, pasteUpdate(e, rowIdx, colIdx, fra))
      // )
      // }
      onChange={e => console.log(e.target.value)
        // dispatch(
        // save(sectionName, countryIso, datum.name, e.target.value, datum, field, acceptNextDecimal)
        // )
      }
      disabled={disabled}
    />
  )
}

Decimal.propTypes = {
  datum: PropTypes.any,
  col: PropTypes.object.isRequired,
  colIdx: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Decimal
