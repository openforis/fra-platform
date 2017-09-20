import React from 'react'
import './percentInput.less'

const renderValue = value =>
  typeof value === 'number' ? value : ''

export class PercentInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  render () {
    const Prefix = ({text}) => text ? <div className="percent__prefix">{text}</div> : null
    return <div className={`percent__field validation-error-sensitive-field ${this.props.prefix ? 'prefixed' : ''}`} ref="wrapper">
      <div className="percent__readonly-view"
           style={{
             display: this.state.hasFocus ? 'none' : 'inline-block',
           }}
      >
        {renderValue(this.props.value)}
      </div>
      <Prefix text={this.props.prefix} />
      <div className="percent__input-field-wrapper" style={{opacity: this.state.hasFocus ? '1' : '0'}}>
        <input
          className="percent__input-field"
          type="text"
          maxLength="3"
          value={ renderValue(this.props.value) }
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
