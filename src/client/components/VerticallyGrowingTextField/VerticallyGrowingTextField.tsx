import './VerticallyGrowingTextField.scss'
import React, { forwardRef, MutableRefObject, useEffect, useRef } from 'react'

import { useIsPrint } from '@client/hooks/useIsPath'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minWidth?: number
  disabled?: boolean
}

const VerticallyGrowingTextField = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { value, minWidth: minWidthProps, disabled, ...rest } = props
  const minWidth = minWidthProps ? `${minWidthProps}px` : null

  const { print } = useIsPrint()

  const _textAreaRef = useRef<HTMLTextAreaElement>(null)
  const textAreaRef = (ref as MutableRefObject<HTMLTextAreaElement>) || _textAreaRef

  useEffect(() => {
    const textArea = textAreaRef.current
    if (textArea) {
      textArea.style.height = 'auto'
      textArea.style.height = `${textArea.scrollHeight}px`
    }
  }, [value])

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
