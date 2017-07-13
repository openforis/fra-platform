import React from 'react'
import './verticallyGrowingTextField.less'

const DEFAULT_HEIGHT = 2

class VerticallyGrowingTextField extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      height: DEFAULT_HEIGHT,
      value: '',
    }

    this.setValue = this.setValue.bind(this)
    this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this)
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

  setValue (event) {
    const {value} = event.target

    this.setState({value})
  }

  getExpandableField () {
    const isOneLine = this.state.height <= DEFAULT_HEIGHT
    const {height, value} = this.state

    return (
      <div>
        <textarea
          className="textarea"
          name="textarea"
          id="textarea"
          defaultValue={value}
          style={{
            height,
            resize: isOneLine ? 'none' : null
          }}
          onChange={this.setValue}
          onKeyUp={this.setFilledTextareaHeight}
        />
      </div>
    )
  }

  getGhostField () {
    return (
      <div
        className="textarea textarea--ghost"
        ref={(c) => this.ghost = c}
        aria-hidden="true"
      >
        {/*
          Use 'x' as a placeholder to keep ghost field in right height even when
          there's no input or plain newline before any text in new row
         */}
        {this.state.value ? this.state.value.replace(/\n/g, '\nx') : 'x'}
      </div>
    )
  }

  render () {
    return (
      <div className="container">
        {this.getExpandableField()}
        {this.getGhostField()}
      </div>
    )
  }
}

export default VerticallyGrowingTextField
