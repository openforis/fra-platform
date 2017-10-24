import React from 'react'
import R from 'ramda'
import './numberInput.less'
import { formatInteger } from '../utils/numberFormat'

export class ThousandSeparatedIntegerInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  render () {
    const {integerValue, onChange, onPaste} = this.props
    return <div className="number-input__container validation-error-sensitive-field" ref="wrapper">
      <div className="number-input__readonly-view"
           style={{display: this.state.hasFocus ? 'none' : 'inline-block'}}>
        {formatInteger(integerValue)}
      </div>
      <input
        type="text"
        maxLength="100"
        disabled={this.props.disabled}
        ref="inputField"
        className="number-input__input-field"
        value={integerValue || ''}
        style={{opacity: this.state.hasFocus ? '1' : '0'}}
        onChange={ onChange }
        onPaste={ onPaste }
        onFocus={
          () => {
            this.select()
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
