import './InputText.scss'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import classNames from 'classnames'

import { useOnChange } from './hooks/useOnChange'
import { useResizeStyle } from './hooks/useResizeStyle'
import { InputTextProps } from './types'

const InputText = forwardRef<HTMLInputElement, InputTextProps>((props, outerRef) => {
  const { className, disabled, id, onBlur, onChange, onFocus, onPaste, placeholder, resize, value, ...rest } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])
  const _onChange = useOnChange({ inputRef, onChange, value })

  const resizeStyle = useResizeStyle({ disabled, inputRef, resize, value })

  if (disabled) {
    return <div className={classNames('input-text disabled', className)}>{value}</div>
  }

  return (
    <input
      {...rest}
      ref={inputRef}
      className={classNames('input-text', className)}
      id={id}
      onBlur={onBlur}
      onChange={_onChange}
      onFocus={onFocus}
      onPaste={onPaste}
      placeholder={placeholder}
      style={resizeStyle}
      type="text"
      value={value}
    />
  )
})

export default InputText
