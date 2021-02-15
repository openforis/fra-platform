import React, { useEffect, useRef } from 'react'
import { usePrintView } from './hooks'
import './verticallyGrowingTextField.less'

type Props = {
  value: string
  minWidth: number
  disabled: boolean
}

const VerticallyGrowingTextField: React.FC<Props> = (props: Props) => {
  const { value, minWidth, disabled, ...rest } = props
  const minWidthStyleAttr = minWidth ? `${minWidth}px` : null

  const [printView] = usePrintView()

  const textAreaRef = useRef(null)

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
        style={{ minWidth: minWidthStyleAttr }}
        value={value}
        {...rest}
      />
      {printView && (
        <div className="text-input__readonly-view only-print" style={{ minWidth: minWidthStyleAttr }}>
          {value}
        </div>
      )}
    </div>
  )
}

export default VerticallyGrowingTextField
