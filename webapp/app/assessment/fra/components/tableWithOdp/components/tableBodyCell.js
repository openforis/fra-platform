import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'
import { formatNumber } from '@common/bignumberUtils'
import { acceptNextDecimal } from '@webapp/utils/numberInput'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import { save, saveMany } from '@webapp/app/assessment/fra/components/tableWithOdp/actions'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const TableBodyCell = props => {
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()

  const { fra, section, disabled, field, datum, validator, rowIdx, colIdx, pasteUpdate } = props

  const className = 'fra-table__cell'
    + (datum.type === 'odp' && !isPrintingMode() ? ' odp-value-cell' : '')
    + (!userInfo || validator(datum, field) ? '' : ' validation-error')

  return (
    <td className={className} key={colIdx}>
      {
        datum.type === 'odp'
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

TableBodyCell.propTypes = {
  fra: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  field: PropTypes.string.isRequired,
  datum: PropTypes.object.isRequired,
  validator: PropTypes.func.isRequired,
  rowIdx: PropTypes.number.isRequired,
  colIdx: PropTypes.number.isRequired,
  pasteUpdate: PropTypes.func.isRequired,
}

TableBodyCell.defaultProps = {
  validator: () => true
}

export default TableBodyCell
