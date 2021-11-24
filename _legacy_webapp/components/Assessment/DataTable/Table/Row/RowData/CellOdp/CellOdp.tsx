import React from 'react'
import { useSelector } from 'react-redux'

import { TableDatumODPType } from '@core/assessment'
import { Numbers } from '@core/utils/numbers'
import { usePrintView } from '../../../../../../../store/app'

import ThousandSeparatedDecimalInput from '../../../../../../../components/thousandSeparatedDecimalInput'
import { useUserInfo } from '../../../../../../../store/user'
import { Props } from './props'
import useOnChange from './useOnChange'

const CellOdp: React.FC<Props> = (props) => {
  const { variableName, disabled, datum, rowSpec } = props
  const { validator, calculateFn } = rowSpec

  const userInfo = useUserInfo()
  const [printView] = usePrintView()
  const valid = useSelector((state) => {
    if (!userInfo || !validator) {
      return true
    }
    return validator(datum)(state)
  })

  const { onChange, onPaste } = useOnChange(props)
  const datumValue = datum[variableName]
  const calculated = !!calculateFn
  const odp = datum.type === TableDatumODPType.odp

  const odpCssCheck = odp && !printView
  let className = calculated ? 'fra-table__calculated-cell' : 'fra-table__cell'
  className += odpCssCheck ? ' odp-value-cell' : ''
  className += valid ? '' : ' validation-error'

  return (
    <td className={className}>
      {calculated && Numbers.format(useSelector(calculateFn(datum)))}

      {!calculated && odp && (
        <div className="number-input__container validation-error-sensitive-field">
          <div className="number-input__readonly-view">{Numbers.format(datumValue)}</div>
        </div>
      )}

      {!calculated && !odp && (
        <ThousandSeparatedDecimalInput
          numberValue={datumValue}
          onPaste={onPaste}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </td>
  )
}

export default CellOdp
