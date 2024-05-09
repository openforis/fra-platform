import './PercentInput.scss'
import React, { useState } from 'react'

import * as R from 'ramda'
import { Numbers } from 'utils/numbers'

import { Sanitizer } from 'client/utils/sanitizer'

type Props = {
  disabled: boolean
  numberValue: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => string | void
  precision?: number
}

const PercentInput: React.FC<Props> = (props: Props) => {
  const { disabled, numberValue, onChange, onPaste, precision } = props
  const [hasFocus, setHasFocus] = useState(false)
  const [inputValue, setInputValue] = useState<string | number | null>(numberValue)

  return (
    <div className="percent-input__container validation-error-sensitive-field">
      <div className="percent-input__readonly-view" style={{ visibility: hasFocus ? 'hidden' : 'visible' }}>
        {Numbers.format(numberValue, precision)}
      </div>
      <input
        className="percent-input__input-field no-print"
        disabled={disabled}
        maxLength={6}
        onBlur={() => {
          setHasFocus(false)
        }}
        onChange={(e) => {
          const { value } = e.target
          if (!Sanitizer.acceptableAsDecimal(value)) {
            return
          }
          setInputValue(value)
          if (!R.pipe(R.path(['target', 'value']), R.defaultTo(''), R.endsWith('.'))(e)) onChange(e)
        }}
        onFocus={() => {
          setHasFocus(true)
          setInputValue(numberValue || null)
        }}
        onPaste={(e) => {
          const pastedValue = onPaste(e)
          if (pastedValue) setInputValue(pastedValue)
        }}
        style={{ opacity: hasFocus ? '1' : '0' }}
        type="text"
        value={inputValue || ''}
      />
      <div className="percent-input__sign">%</div>
    </div>
  )
}

PercentInput.defaultProps = {
  precision: 2,
}

export default PercentInput
