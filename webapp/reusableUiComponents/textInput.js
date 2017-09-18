import React from 'react'
import './textInput.less'

export default class TextInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  render() {
    return <div className="text-field">
      <div className="text-field__readonly-view"
           style={{
             display: this.state.hasFocus ? 'none' : 'inline-block',
           }}>
        { this.props.value }
      </div>
      <div style={ {opacity: this.state.hasFocus ? '1' : '0'} }>
        <input
          type="text"
          className="fra-table__input"
          value={ this.props.value }
          onChange={ this.props.onChange }
          onPaste={ this.props.onPaste}
          onFocus={ () => { this.setState({hasFocus: true}) } }
          onBlur={ () => { this.setState({hasFocus: false}) } }
        />
      </div>
    </div>
  }
}
