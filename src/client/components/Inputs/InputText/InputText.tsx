import './InputText.scss'
import React, { forwardRef, InputHTMLAttributes, useImperativeHandle, useRef } from 'react'

import { useOnChange } from './hooks/useOnChange'

type Props = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'id' | 'onChange' | 'onPaste' | 'placeholder' | 'value'
>

const InputText = forwardRef<HTMLInputElement, Props>((props, outerRef) => {
  const { disabled, id, onChange, onPaste, placeholder, value } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])
  const _onChange = useOnChange({ inputRef, onChange, value })

  if (disabled) {
    return <div className="input-text disabled">{value}</div>
  }

  return (
    <input
      ref={inputRef}
      className="input-text"
      id={id}
      onChange={_onChange}
      onPaste={onPaste}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  )
})

export default InputText
