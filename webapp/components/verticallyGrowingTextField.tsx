import React, { useEffect, useRef } from 'react'
import { usePrintView } from './hooks'
import './verticallyGrowingTextField.less'

type Props = {
  value: string
  minWidth?: number
  disabled: boolean
  className?: string
  placeholder?: string
  onChange: (evt: any) => any
  onKeyDown: (evt: any) => any
  onFocus: (evt: any) => any
  onKeyUp: (evt: any) => any
  onClick: (evt: any) => any
  ref: any
}

const VerticallyGrowingTextField: React.FC<Props> = React.forwardRef((props: Props, ref: any) => {
  const { value, minWidth, disabled, ...rest } = props
  const minWidthStyleAttr = minWidth ? `${minWidth}px` : null

  const [printView] = usePrintView()

  const _textAreaRef = useRef(null)
  const textAreaRef = ref || _textAreaRef

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
})

export default VerticallyGrowingTextField
