import React from 'react'
import * as R from 'ramda'
import './verticallyGrowingTextField.less'

class VerticallyGrowingTextField extends React.Component {

  componentDidMount() {
    this.resizeTextArea()
  }

  componentDidUpdate(prev) {
    if(!R.equals(this.props.value, prev.value)) {
      this.resizeTextArea()
    }
  }

  resizeTextArea() {
    const elem = document.getElementById(this.props.id)
    elem.style.height = 'auto'
    elem.style.height = `${elem.scrollHeight}px`
  }

  render () {
    return (
      <div className="vgtf__container">
        <textarea
          rows="1"
          className="vgtf__textarea"
          {...this.props} />
      </div>
    )
  }
}

export default VerticallyGrowingTextField
