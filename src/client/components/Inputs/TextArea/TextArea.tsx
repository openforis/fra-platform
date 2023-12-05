import './TextArea.scss'
import React, { forwardRef, TextareaHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react'

type Props = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'disabled' | 'onChange' | 'onPaste' | 'placeholder' | 'value'
>

const TextArea = forwardRef<HTMLTextAreaElement, Props>((props, outerRef) => {
  const { disabled, onChange, onPaste, placeholder, value } = props

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(outerRef, () => textAreaRef.current!, [])

  useEffect(() => {
    const textArea = textAreaRef.current
    textArea.style.height = 'auto'
    textArea.style.height = `${textArea.scrollHeight}px`
  }, [disabled, textAreaRef, value])

  return (
    <textarea
      className="textarea validation-error-sensitive-field"
      disabled={disabled}
      onChange={onChange}
      onPaste={onPaste}
      placeholder={placeholder}
      ref={textAreaRef}
      rows={1}
      value={value}
    />
  )
})

export default TextArea
