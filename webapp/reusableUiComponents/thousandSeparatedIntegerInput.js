import React from 'react'
import R from 'ramda'
import './thousandSeparatedInput.less'
import { formatInteger } from '../utils/numberFormat'

export class ThousandSeparatedIntegerInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  render () {
    const {integerValue, onChange, onPaste} = this.props
    return <div className="tsi__field validation-error-sensitive-field" ref="wrapper">
      <div className="tsi__readonly-view"
           style={{display: this.state.hasFocus ? 'none' : 'inline-block'}}>
        {formatInteger(integerValue)}
      </div>
      <input
        type="text"
        maxLength="100"
        disabled={this.props.disabled}
        ref="inputField"
        className="tsi__input-field"
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
