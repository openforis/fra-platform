import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { Numbers } from 'utils/numbers'

import InputText from 'client/components/Inputs/InputText'

import { useOnBlur } from './hooks/useOnBlur'
import { useOnChange } from './hooks/useOnChange'
import { InputNumberProps } from './types'

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>((props, outerRef) => {
  const { className, disabled, id, onChange, onPaste, placeholder, precision, value } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])

  const [focused, setFocused] = useState<boolean>(false)

  const _onChange = useOnChange({ inputRef, onChange, precision })
  const _onBlur = useOnBlur({ onChange, precision, value })

  const formattedValue = Numbers.format(String(value ?? ''), precision) ?? ''

  return (
    <InputText
      ref={inputRef}
      className={className}
      disabled={disabled}
      id={id}
      onBlur={(e) => {
        _onBlur(e)
        setFocused(false)
      }}
      onChange={_onChange}
      onFocus={() => setFocused(true)}
      onPaste={onPaste}
      placeholder={placeholder}
      value={focused ? value ?? '' : formattedValue}
    />
  )
})

InputNumber.defaultProps = {
  precision: 2,
}

export default InputNumber
