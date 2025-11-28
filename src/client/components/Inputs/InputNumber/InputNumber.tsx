import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { Numbers } from 'utils/numbers'

import InputText from 'client/components/Inputs/InputText'

import { useOnBlur } from './hooks/useOnBlur'
import { useOnChange } from './hooks/useOnChange'
import { InputNumberProps } from './types'

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>((props, outerRef) => {
  const { className, disabled, id, onChange, onPaste, placeholder, precision = 2, resize, value } = props

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
      onBlur={(e): void => {
        _onBlur(e)
        setFocused(false)
      }}
      onChange={_onChange}
      onFocus={(): void => {
        setFocused(true)
      }}
      onPaste={onPaste}
      placeholder={placeholder}
      resize={resize}
      value={focused ? (value ?? '') : formattedValue}
    />
  )
})

export default InputNumber
