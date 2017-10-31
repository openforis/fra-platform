import React from 'react'
import './percentInput.less'

export class PercentInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  render () {
    return <div className="percent-input__container validation-error-sensitive-field" ref="wrapper">
      <div className="percent-input__readonly-view"
           style={{display: this.state.hasFocus ? 'none' : 'inline-block'}}>
        {this.props.value}
      </div>
      <input
        className="percent-input__input-field"
        type="text"
        maxLength="3"
        ref="percentInputField"
        value={this.props.value}
        style={{opacity: this.state.hasFocus ? '1' : '0'}}
        onChange={this.props.onChange}
        onPaste={this.props.onPaste}
        onFocus={() => {
          this.setState({hasFocus: true})
          this.refs.percentInputField.select()
        }}
        onBlur={() => {this.setState({hasFocus: false})}}
      />
      <div className="percent-input__sign">%</div>
    </div>
  }
}
