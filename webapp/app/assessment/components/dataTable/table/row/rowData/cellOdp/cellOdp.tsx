import React from 'react'
import { useSelector } from 'react-redux'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { formatNumber } from '@common/bignumberUtils'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import { usePrintView, useUserInfo } from '@webapp/components/hooks'

import useOnChange from './useOnChange'

type OwnProps = {
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

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof CellOdp.defaultProps

// @ts-expect-error ts-migrate(7022) FIXME: 'CellOdp' implicitly has type 'any' because it doe... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ numberValue: any; onPaste: (event: any) =>... Remove this comment to see the full error message
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
