import './InputText.scss'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'

import { useOnChange } from './hooks/useOnChange'
import { useResizeStyle } from './hooks/useResizeStyle'
import { InputTextProps } from './types'

const defaults: Partial<InputTextProps> = {
  type: 'text',
}
const InputText = forwardRef<HTMLInputElement, InputTextProps>((props, outerRef) => {
  const {
    bordered,
    className,
    disabled,
    id,
    onBlur,
    onChange,
    onFocus,
    onPaste,
    placeholder,
    resize,
    type = defaults.type,
    value,
    ...rest
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])
  const _onChange = useOnChange({ inputRef, onChange, type, value })

  const resizeStyle = useResizeStyle({ disabled, inputRef, resize, value })

  if (disabled) {
    return <div className={classNames('input-text disabled', className)}>{value}</div>
  }

  return (
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={inputRef}
      className={classNames('input-text', { bordered }, className)}
      id={id}
      onBlur={onBlur}
      onChange={_onChange}
      onFocus={onFocus}
      onPaste={onPaste}
      placeholder={placeholder}
      style={resizeStyle}
      type={type}
      value={value}
    />
  )
})

export default InputText
