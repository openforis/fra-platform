import React from 'react'
import * as R from 'ramda'
import './verticallyGrowingTextField.less'

class VerticallyGrowingTextField extends React.Component {

  componentDidMount () {
    this.resizeTextArea()
  }

  componentDidUpdate (prev) {
    if (!R.equals(this.props.value, prev.value)) {
      this.resizeTextArea()
    }
  }

  resizeTextArea () {
    const textArea = this.refs.textArea
    if (textArea) {
      textArea.style.height = 'auto'
      textArea.style.height = `${textArea.scrollHeight}px`
    }
  }

  render () {
    const {minWidth, disabled} = this.props
    const minWidthStyleAttr = minWidth ? `${minWidth}px` : null

    return (
      <div className="vgtf__container">
        <textarea
          ref="textArea"
          disabled={disabled}
          rows="1"
          className="vgtf__textarea no-print"
          style={{minWidth: minWidthStyleAttr}}
          {...R.dissoc('minWidth', this.props)} />
        <div className="text-input__readonly-view only-print" style={{minWidth: minWidthStyleAttr}}>
          {this.props.value}
        </div>
      </div>
    )
  }
}

export default VerticallyGrowingTextField
