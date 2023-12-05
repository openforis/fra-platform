import './TextArea.scss'
import React, { forwardRef, TextareaHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react'

type AdditionalProps = {
  maxHeight?: number | null
}

type Props = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'disabled' | 'onChange' | 'onPaste' | 'placeholder' | 'value'
> &
  AdditionalProps

const TextArea = forwardRef<HTMLTextAreaElement, Props>((props, outerRef) => {
  const { disabled, maxHeight, onChange, onPaste, placeholder, value } = props

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(outerRef, () => textAreaRef.current!, [])

  useEffect(() => {
    const textArea = textAreaRef.current
    textArea.style.height = 'auto'
    const newHeight = Math.min(textArea.scrollHeight, maxHeight)
    textArea.style.height = `${newHeight}px`
  }, [disabled, textAreaRef, value, maxHeight])

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

TextArea.defaultProps = {
  maxHeight: null,
}

export default TextArea
