import './TextArea.scss'
import React, { forwardRef, TextareaHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react'

type Props = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'disabled' | 'onChange' | 'onPaste' | 'placeholder' | 'rows' | 'value'
> & { maxHeight?: number | null }

const TextArea = forwardRef<HTMLTextAreaElement, Props>((props, outerRef) => {
  const { disabled, maxHeight, onChange, onPaste, placeholder, rows, value } = props

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(outerRef, () => textAreaRef.current!, [])

  const adjustTextAreaHeight = (textAreaRef: React.MutableRefObject<HTMLTextAreaElement>, maxHeight: number | null) => {
    const textArea = textAreaRef.current
    if (!textArea) return

    textArea.style.height = 'auto'
    const newHeight = Math.min(textArea.scrollHeight, maxHeight)
    textArea.style.height = `${newHeight}px`
  }

  useEffect(() => {
    const handleResize = () => {
      adjustTextAreaHeight(textAreaRef, maxHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [textAreaRef, maxHeight])

  useEffect(() => {
    adjustTextAreaHeight(textAreaRef, maxHeight)
  }, [disabled, textAreaRef, value, maxHeight])

  return (
    <textarea
      className="textarea validation-error-sensitive-field"
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
