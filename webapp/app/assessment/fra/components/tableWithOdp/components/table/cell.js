import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'
import { formatNumber } from '@common/bignumberUtils'
import { acceptNextDecimal } from '@webapp/utils/numberInput'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useTableCellClassOdp
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableCellCssClassOdp'

import { save, saveMany } from '@webapp/app/assessment/fra/components/tableWithOdp/actions'

const Cell = props => {
  const {
    fra, section, disabled, field,
    datum, validator, rowIdx, colIdx,
    calculated, calculateFn,
    pasteUpdate,
  } = props

  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const valid = useSelector(state => {
    if (!userInfo || !validator) {
      return true
    }
    return validator(datum)(state)
  })

  const cssClassCalculated = useTableCellClassOdp(datum)

  let className = calculated
    ? cssClassCalculated
    : 'fra-table__cell'
    + (datum.type === 'odp' && !isPrintingMode() ? ' odp-value-cell' : '')

  className += valid ? '' : ' validation-error'

  return (
    <td className={className} key={colIdx}>
      {
        calculated
          ? (
            formatNumber(useSelector(calculateFn(datum)))
          )
          : datum.type === 'odp'
          ? (
            <div className="number-input__container validation-error-sensitive-field">
              <div className="number-input__readonly-view">
                {
                  formatNumber(datum[field])
                }
              </div>
            </div>
          )
          : (
            <ThousandSeparatedDecimalInput
              numberValue={datum[field]}
              onPaste={e => dispatch(
                saveMany(section, countryIso, pasteUpdate(e, rowIdx, colIdx, fra))
              )}
              onChange={e => dispatch(
                save(section, countryIso, datum.name, e.target.value, datum, field, acceptNextDecimal)
              )}
              disabled={disabled}
            />
          )
      }
    </td>
  )
}

Cell.propTypes = {
  fra: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  field: PropTypes.string.isRequired,
  datum: PropTypes.object.isRequired,
  validator: PropTypes.func,
  rowIdx: PropTypes.number.isRequired,
  colIdx: PropTypes.number.isRequired,
  pasteUpdate: PropTypes.func.isRequired,

  calculated: PropTypes.bool.isRequired,
  calculateFn: PropTypes.func,
}

Cell.defaultProps = {
  calculated: false,
}

export default Cell
