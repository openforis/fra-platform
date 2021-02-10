import React from 'react'
import * as R from 'ramda'
import './verticallyGrowingTextField.less'

class VerticallyGrowingTextField extends React.Component {
  props: any
  componentDidMount() {
    this.resizeTextArea()
  }

  componentDidUpdate(prev: any) {
    if (!R.equals((this.props as any).value, prev.value)) {
      this.resizeTextArea()
    }
  }

  resizeTextArea() {
    const { textArea } = this.refs
    if (textArea) {
      ;(textArea as any).style.height = 'auto'
      ;(textArea as any).style.height = `${(textArea as any).scrollHeight}px`
    }
  }

  render() {
    const { minWidth, disabled } = this.props
    const minWidthStyleAttr = minWidth ? `${minWidth}px` : null
    return (
      <div className="vgtf__container">
        <textarea
          ref="textArea"
          disabled={disabled}
          rows={1}
          className="vgtf__textarea no-print"
          style={{ minWidth: minWidthStyleAttr }}
          {...R.dissoc('minWidth', this.props)}
        />
        <div className="text-input__readonly-view only-print" style={{ minWidth: minWidthStyleAttr }}>
          {(this.props as any).value}
        </div>
      </div>
    )
  }
}
export default VerticallyGrowingTextField
