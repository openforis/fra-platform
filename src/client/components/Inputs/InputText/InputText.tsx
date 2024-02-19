import './InputText.scss'
import React, { forwardRef, InputHTMLAttributes, useImperativeHandle, useRef } from 'react'

type Props = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'id' | 'onChange' | 'onPaste' | 'placeholder' | 'value'
>

const InputText = forwardRef<HTMLInputElement, Props>((props, outerRef) => {
  const { disabled, id, onChange, onPaste, value } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])

  if (disabled) {
    return <div className="input-text disabled">{value}</div>
  }

  return (
    <input
      className="input-text"
      id={id}
      onChange={onChange}
      onPaste={onPaste}
      ref={inputRef}
      type="text"
      value={value}
    />
  )
})

export default InputText
