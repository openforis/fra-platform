import './InputText.scss'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import classNames from 'classnames'

import { useOnChange } from './hooks/useOnChange'
import { InputTextProps } from './types'

const InputText = forwardRef<HTMLInputElement, InputTextProps>((props, outerRef) => {
  const { className, disabled, id, onBlur, onChange, onFocus, onPaste, placeholder, value } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])
  const _onChange = useOnChange({ inputRef, onChange, value })

  if (disabled) {
    return <div className="input-text disabled">{value}</div>
  }

  return (
    <input
      ref={inputRef}
      className={classNames('input-text', className)}
      id={id}
      onBlur={onBlur}
      onChange={_onChange}
      onFocus={onFocus}
      onPaste={onPaste}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  )
})

export default InputText
