import './VerticallyGrowingTextField.scss'
import React, { forwardRef, MutableRefObject, useEffect, useRef } from 'react'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minWidth?: number
  disabled?: boolean
}

/**
 * @deprecated
 * Use client/components/Inputs/TextArea
 */
const VerticallyGrowingTextField = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { value, minWidth: minWidthProps, disabled, ...rest } = props
  const minWidth = minWidthProps ? `${minWidthProps}px` : null

  const { print } = useIsPrintRoute()

  const _textAreaRef = useRef<HTMLTextAreaElement>(null)
  const textAreaRef = (ref as MutableRefObject<HTMLTextAreaElement>) || _textAreaRef

  useEffect(() => {
    const textArea = textAreaRef.current
    if (textArea) {
      textArea.style.height = 'auto'
      textArea.style.height = `${textArea.scrollHeight}px`
    }
  }, [textAreaRef, value])

  return (
    <div className="vgtf__container">
      <textarea
        ref={textAreaRef}
        disabled={disabled}
        rows={1}
        className="vgtf__textarea no-print"
        style={{ minWidth }}
        value={value}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />

      {print && (
        <div className="text-input__readonly-view only-print" style={{ minWidth }}>
          {value}
        </div>
      )}
    </div>
  )
})

VerticallyGrowingTextField.defaultProps = {
  disabled: false,
  minWidth: null,
}

export default VerticallyGrowingTextField
