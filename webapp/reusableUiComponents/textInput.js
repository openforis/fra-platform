import React from 'react'
import './textInput.less'

export default class TextInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  render() {
    const minWidthStyleAttr = this.props.minWidth ? `${this.props.minWidth}px` : null
    return <div className="text-input__container">
      <div className="text-input__readonly-view"
           style={{display: this.state.hasFocus ? 'none' : 'inline-block'}}>
        { this.props.value }
      </div>
      <input
        type="text"
        style={{opacity: this.state.hasFocus ? '1' : '0',
                minWidth: minWidthStyleAttr}}
        className="text-input__input-field"
        value={ this.props.value || '' }
        onChange={ this.props.onChange }
        onPaste={ this.props.onPaste }
        onFocus={ () => { this.setState({hasFocus: true}) } }
        onBlur={ () => { this.setState({hasFocus: false}) } }
      />
    </div>
  }
}
