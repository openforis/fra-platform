import React from 'react'
import R from 'ramda'
import './thousandSeparatedIntegerInput.less'
import { formatInteger } from '../utils/numberFormat'

export class ThousandSeparatedIntegerInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  render () {
    const {integerValue, onChange, onPaste, className} = this.props
    return <div className="tsii__field validation-error-sensitive-field" ref="wrapper">
      <div className="tsii__readonly-view"
           style={{display: this.state.hasFocus ? 'none' : 'inline-block'}}>
        {formatInteger(integerValue)}
      </div>
      <input
        type="text"
        maxLength="100"
        disabled={this.props.disabled}
        ref="inputField"
        className={className}
        value={integerValue || ''}
        style={{opacity: this.state.hasFocus ? '1' : '0'}}
        onChange={ onChange }
        onPaste={ onPaste }
        onFocus={
          () => {
            this.setState({hasFocus: true})
            this.refs.inputField.value = R.isNil(integerValue) ? null : integerValue //prevent text "undefined" from rendering
          }
        }
        onBlur={
          () => { this.setState({hasFocus: false}) }
        }
      />
    </div>
  }
}
