import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { formatNumber } from '@common/bignumberUtils'
import { acceptNextDecimal } from '@webapp/utils/numberInput'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import { usePrintView, useUserInfo } from '@webapp/components/hooks'

const CellOdp = (props) => {
  const {
    assessmentType,
    sectionName,
    tableName,
    updateTableDataCell,
    variableName,
    disabled,
    datum,
    validator,
    calculateFn,
  } = props

  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const [printView] = usePrintView()
  const valid = useSelector((state) => {
    if (!userInfo || !validator) {
      return true
    }
    return validator(datum)(state)
  })

  const datumValue = datum[variableName]
  const calculated = !!calculateFn
  const { type } = datum
  const odp = type === 'odp'

  const odpCssCheck = odp && !printView
  let className = calculated ? 'fra-table__calculated-cell' : 'fra-table__cell'
  className += odpCssCheck ? ' odp-value-cell' : ''
  className += valid ? '' : ' validation-error'

  return (
    <td className={className}>
      {calculated && formatNumber(useSelector(calculateFn(datum)))}

      {!calculated && odp && (
        <div className="number-input__container validation-error-sensitive-field">
          <div className="number-input__readonly-view">{formatNumber(datumValue)}</div>
        </div>
      )}

      {!calculated && !odp && (
        <ThousandSeparatedDecimalInput
          numberValue={datumValue}
          onPaste={() => {
            // TODO
          }}
          onChange={(e) => {
            const { value } = e.target

            let valueUpdate = acceptNextDecimal(value, datumValue)
            valueUpdate = valueUpdate && String(valueUpdate)
            const datumUpdate = { ...datum, [variableName]: valueUpdate, [`${variableName}Estimated`]: false }

            dispatch(updateTableDataCell(assessmentType, sectionName, tableName, datumUpdate, variableName))
          }}
          disabled={disabled}
        />
      )}
    </td>
  )
}

CellOdp.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  variableName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  datum: PropTypes.object.isRequired,
  validator: PropTypes.func,
  calculateFn: PropTypes.func,
  updateTableDataCell: PropTypes.func.isRequired,
}

CellOdp.defaultProps = {
  validator: null,
  calculateFn: null,
}

export default CellOdp
