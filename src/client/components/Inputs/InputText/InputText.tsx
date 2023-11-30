import './InputText.scss'
import React, { forwardRef, InputHTMLAttributes, useImperativeHandle, useRef } from 'react'

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'onChange' | 'onPaste' | 'placeholder' | 'value'>

const InputText = forwardRef<HTMLInputElement, Props>((props, outerRef) => {
  const { disabled, onChange, onPaste, value } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])

  return (
    <input
      className="input-text validation-error-sensitive-field"
      disabled={disabled}
      onChange={onChange}
      onPaste={onPaste}
      ref={inputRef}
      type="text"
      value={value}
    />
  )
})

export default InputText
