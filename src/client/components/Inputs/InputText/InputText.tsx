import './InputText.scss'
import React, { forwardRef, InputHTMLAttributes, useImperativeHandle, useRef } from 'react'

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'onChange' | 'onPaste' | 'placeholder' | 'value'>

const InputText = forwardRef<HTMLInputElement, Props>((props, outerRef) => {
  const { disabled, onChange, onPaste, placeholder, value } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])

  if (disabled) {
    return <div className="input-text disabled validation-error-sensitive-field">{value}</div>
  }

  return (
    <input
      className="input-text validation-error-sensitive-field"
      onChange={onChange}
      onPaste={onPaste}
      placeholder={placeholder}
      ref={inputRef}
      type="text"
      value={value}
    />
  )
})

export default InputText
