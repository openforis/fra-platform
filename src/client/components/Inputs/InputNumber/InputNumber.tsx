import './InputNumber.scss'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { useOnBlur } from './hooks/useOnBlur'
import { useOnChange } from './hooks/useOnChange'
import { InputNumberProps } from './types'

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>((props, outerRef) => {
  const {
    disabled,
    id,
    isInteger,
    maxLength,
    onChange,
    onPaste,
    placeholder,
    precision,
    shouldRound,
    thousandSeparated,
    value,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])

  const [localValue, setLocalValue] = useState<typeof value>(value)
  const [focused, setFocused] = useState<boolean>(false)

  const _onChange = useOnChange({ inputRef, isInteger, onChange, setLocalValue, value: localValue })
  const _onBlur = useOnBlur({ isInteger, onChange, precision, shouldRound, value })

  const formatPrecision = isInteger ? 0 : precision
  const formattedValue = thousandSeparated
    ? Numbers.format(String(value ?? ''), formatPrecision)
    : Numbers.toFixed(String(value ?? ''), formatPrecision)

  const inputVisible = focused || Objects.isEmpty(formattedValue)

  useEffect(() => {
    if (!focused) setLocalValue(value)
  }, [value, focused])

  return (
    <div className="input-number__container">
      {!inputVisible && <div className="input-number__readonly-view">{formattedValue}</div>}
      <input
        ref={inputRef}
        className={classNames('input-number', { visible: inputVisible })}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        onBlur={(e) => {
          _onBlur(e)
          setFocused(false)
        }}
        onChange={_onChange}
        onFocus={() => setFocused(true)}
        onPaste={onPaste}
        placeholder={placeholder}
        type="text"
        value={localValue ?? ''}
      />
    </div>
  )
})

InputNumber.defaultProps = {
  isInteger: false,
  precision: 2,
  shouldRound: false,
  thousandSeparated: false,
}

export default InputNumber
