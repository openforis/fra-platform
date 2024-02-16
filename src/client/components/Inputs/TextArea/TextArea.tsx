import './TextArea.scss'
import React, { forwardRef, TextareaHTMLAttributes, useImperativeHandle, useRef } from 'react'

import useResize from './hooks/useResize'

type Props = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'disabled' | 'onChange' | 'onPaste' | 'placeholder' | 'rows' | 'value'
> & { maxHeight?: number }

const TextArea = forwardRef<HTMLTextAreaElement, Props>((props, outerRef) => {
  const { disabled, maxHeight, onChange, onPaste, placeholder, rows, value } = props

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(outerRef, () => textAreaRef.current!, [])

  useResize({ textAreaRef, maxHeight, value })

  return (
    <textarea
      className="textarea"
      disabled={disabled}
      onChange={onChange}
      onPaste={onPaste}
      placeholder={placeholder}
      ref={textAreaRef}
      rows={rows}
      value={value}
    />
  )
})

TextArea.defaultProps = {
  maxHeight: null,
  rows: 1,
} as Props

export default TextArea
