import './TextArea.scss'
import React, { forwardRef, TextareaHTMLAttributes, useImperativeHandle, useRef } from 'react'

import { useIsPrintRoute } from 'client/hooks/routes'

import useResize from './hooks/useResize'

type Props = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'disabled' | 'onChange' | 'onPaste' | 'placeholder' | 'rows' | 'value'
> & { maxHeight?: number }

const TextArea = forwardRef<HTMLTextAreaElement, Props>((props, outerRef) => {
  const { disabled, maxHeight, onChange, onPaste, placeholder, rows = 1, value } = props
  const { print } = useIsPrintRoute()

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(outerRef, () => textAreaRef.current!, [])

  useResize({ textAreaRef, maxHeight, value })

  if (print) {
    return <div className="textarea-print">{value}</div>
  }

  return (
    <textarea
      ref={textAreaRef}
      className="textarea"
      disabled={disabled}
      onChange={onChange}
      onPaste={onPaste}
      placeholder={placeholder}
      rows={rows}
      value={value}
    />
  )
})

export default TextArea
