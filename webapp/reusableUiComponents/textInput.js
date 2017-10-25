import React from 'react'
import './textInput.less'
import { isEmpty } from 'ramda'

export default class TextInput extends React.Component {
  constructor (props) {
    super(props)
    const placeholder = this.props.placeholder ? this.props.placeholder : ''
    this.state = {hasFocus: false, placeholder}
  }

  render () {
    const minWidthStyleAttr = this.props.minWidth ? `${this.props.minWidth}px` : null
    const isValueEmpty = isEmpty(this.props.value)
    const disabled = this.props.disabled

    return <div className="text-input__container">
      <div
        className={`text-input__readonly-view${isValueEmpty ? ' placeholder' : ''}`}
        style={{display: this.state.hasFocus ? 'none' : 'inline-block'}}>
        {isValueEmpty ? this.state.placeholder : this.props.value}
      </div>

      <input
        type="text"
        style={{
          opacity: this.state.hasFocus ? '1' : '0',
          minWidth: minWidthStyleAttr
        }}
        className="text-input__input-field"
        value={this.props.value || ''}
        onChange={this.props.onChange}
        onPaste={this.props.onPaste}
        onFocus={() => { this.setState({hasFocus: true}) }}
        onBlur={() => { this.setState({hasFocus: false}) }}
        placeholder={this.state.placeholder}
        disabled={disabled}
      />
    </div>
  }
}
