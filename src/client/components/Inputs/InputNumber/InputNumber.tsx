import './InputNumber.scss'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { useOnBlur } from './hooks/useOnBlur'
import { useOnChange } from './hooks/useOnChange'
import { InputNumberProps } from './types'

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>((props, outerRef) => {
  const { disabled, id, maxLength, onChange, onPaste, placeholder, precision, value } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])

  const [localValue, setLocalValue] = useState<typeof value>(value)
  const [focused, setFocused] = useState<boolean>(false)
  const hasPasted = useRef<boolean>(false)

  const _onChange = useOnChange({ inputRef, onChange, precision, setLocalValue, value })
  const _onBlur = useOnBlur({ onChange, precision, value })

  const formattedValue = Numbers.format(String(value ?? ''), precision)

  const inputVisible = focused || Objects.isEmpty(formattedValue)

  useEffect(() => {
    if (!focused || hasPasted.current) {
      setLocalValue(value)
      hasPasted.current = false
    }
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
        onPaste={(e) => {
          hasPasted.current = true
          onPaste?.(e)
        }}
        placeholder={placeholder}
        type="text"
        value={localValue ?? ''}
      />
    </div>
  )
})

InputNumber.defaultProps = {
  precision: 2,
}

export default InputNumber
