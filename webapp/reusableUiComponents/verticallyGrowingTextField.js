import React from 'react'
import './verticallyGrowingTextField.less'

class VerticallyGrowingTextField extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.mounted = true
    this.setFilledTextareaHeight()
  }

  setFilledTextareaHeight () {
    if (this.mounted) {
      const element = this.ghost

      this.setState({
        height: element.clientHeight,
      })
    }
  }

  getExpandableField () {
    const {height} = this.state

    return (
      <div>
        <textarea
          className="vgtf__textarea"
          value={this.props.value}
          style={{height}}
          onChange={this.props.onChange}
          onPaste={this.props.onPaste}
          onKeyUp={() => this.setFilledTextareaHeight()}
        />
      </div>
    )
  }

  getGhostField () {
    return (
      <div
        className="vgtf__textarea--ghost"
        ref={(c) => this.ghost = c}
        aria-hidden="true"
      >
        {/*
          Use 'x' as a placeholder to keep ghost field in right height even when
          there's no input or plain newline before any text in new row
         */}
        { this.props.value ? this.props.value.replace(/\n/g, '\nx') : 'x' }
      </div>
    )
  }

  render () {
    return (
      <div className="vgtf__container">
        {this.getExpandableField()}
        {this.getGhostField()}
      </div>
    )
  }
}

export default VerticallyGrowingTextField
