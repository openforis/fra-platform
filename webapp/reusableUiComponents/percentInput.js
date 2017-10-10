import React from 'react'
import './percentInput.less'

export class PercentInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  render () {
    return <div className={`percent__field validation-error-sensitive-field`} ref="wrapper">
      <div className="percent__readonly-view"
           style={{
             display: this.state.hasFocus ? 'none' : 'inline-block',
           }}
      >
        {this.props.value}
      </div>
      <div className="percent__input-field-wrapper" style={{opacity: this.state.hasFocus ? '1' : '0'}}>
        <input
          className="percent__input-field"
          type="text"
          maxLength="3"
          value={ this.props.value }
          onChange={ this.props.onChange }
          onPaste={ this.props.onPaste }
          onFocus={ () => { this.setState({hasFocus: true}) } }
          onBlur={ () => { this.setState({hasFocus: false}) } }
        />
      </div>
      <div className="percent__sign">%</div>
    </div>
  }
}
