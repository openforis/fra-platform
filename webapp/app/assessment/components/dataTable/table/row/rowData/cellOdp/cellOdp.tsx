import React from 'react'
import { useSelector } from 'react-redux'

import { formatNumber } from '@common/bignumberUtils'

import ThousandSeparatedDecimalInput from '@webapp/components/thousandSeparatedDecimalInput'
import { usePrintView, useUserInfo } from '@webapp/components/hooks'

import useOnChange from './useOnChange'

type Props = {
  assessmentType: string
  sectionName: string
  tableSpec: any
  variableName: string
  disabled: boolean
  data: any[]
  datum: any
  validator?: (...args: any[]) => any
  calculateFn?: (...args: any[]) => any
}

const CellOdp = (props: Props) => {
  const { assessmentType, sectionName, tableSpec, variableName, disabled, data, datum, validator, calculateFn } = props

  const userInfo = useUserInfo()
  const [printView] = usePrintView()
  const valid = useSelector((state) => {
    if (!userInfo || !validator) {
      return true
    }
    return validator(datum)(state)
  })
  const { onChange, onPaste } = useOnChange({ assessmentType, sectionName, tableSpec, variableName, data, datum })
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
          onPaste={onPaste}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </td>
  )
}

CellOdp.defaultProps = {
  validator: null,
  calculateFn: null,
}

export default CellOdp
