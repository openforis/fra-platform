import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'
import { formatNumber } from '@common/bignumberUtils'
// import { acceptNextDecimal } from '@webapp/utils/numberInput'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
// import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

// import { save, saveMany } from '@webapp/app/assessment/fra/components/tableWithOdp/actions'

const CellOdp = props => {
  const {
    // data,
    // sectionName,
    disabled,
    variableName,
    datum,
    validator,
    // rowIdx,
    // colIdx,
    calculateFn,
    // pasteUpdate,
  } = props

  // const dispatch = useDispatch()
  // const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const valid = useSelector(state => {
    if (!userInfo || !validator) {
      return true
    }
    return validator(datum)(state)
  })

  const calculated = !!calculateFn
  const { type } = datum
  const odp = type === 'odp'

  const odpCssCheck = odp && !isPrintingMode()
  let className = calculated ? 'fra-table__calculated-cell' : 'fra-table__cell'
  className += odpCssCheck ? ' odp-value-cell' : ''
  className += valid ? '' : ' validation-error'

  return (
    <td className={className}>
      {calculated && formatNumber(useSelector(calculateFn(datum)))}

      {!calculated && odp && (
        <div className="number-input__container validation-error-sensitive-field">
          <div className="number-input__readonly-view">{formatNumber(datum[variableName])}</div>
        </div>
      )}

      {!calculated && !odp && (
        <ThousandSeparatedDecimalInput
          numberValue={datum[variableName]}
          // onPaste={e => dispatch(
          //   saveMany(section, countryIso, pasteUpdate(e, rowIdx, colIdx, fra))
          // )}
          // onChange={e => dispatch(
          //   save(section, countryIso, datum.name, e.target.value, datum, field, acceptNextDecimal)
          // )}
          disabled={disabled}
        />
      )}
    </td>
  )
}

CellOdp.propTypes = {
  // data: PropTypes.array.isRequired,
  // sectionName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  variableName: PropTypes.string.isRequired,
  datum: PropTypes.object.isRequired,
  validator: PropTypes.func,
  // rowIdx: PropTypes.number.isRequired,
  // colIdx: PropTypes.number.isRequired,
  // pasteUpdate: PropTypes.func.isRequired,
  calculateFn: PropTypes.func,
}

CellOdp.defaultProps = {
  validator: null,
  calculateFn: null,
}

export default CellOdp
