import React from 'react'
import * as R from 'ramda'

import './numberInput.less'
import { formatDecimal } from '../utils/numberFormat'
import { acceptableAsDecimal } from '../utils/numberInput'

export class ThousandSeparatedDecimalInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasFocus: false, inputValue: props.numberValue }
  }

  render () {
    const { numberValue, onChange, onPaste, disabled } = this.props
    const value = this.state.inputValue || numberValue

    return <div className="number-input__container validation-error-sensitive-field" ref="wrapper">
      <div className="number-input__readonly-view" style={{ visibility: this.state.hasFocus ? 'hidden' : 'visible' }}>
        {formatDecimal(numberValue)}
      </div>
      <input
        type="text"
        maxLength="100"
        disabled={disabled}
        className="number-input__input-field no-print"
        ref="decimalInputField"
        value={value || ''}
        style={{ opacity: this.state.hasFocus ? '1' : '0' }}
        onChange={e => {
          if (!acceptableAsDecimal(e.target.value)) {
            return
          }
          this.setState({ inputValue: e.target.value })
          if (!R.pipe(R.path(['target', 'value']), R.defaultTo(''), R.endsWith('.'))(e))
            onChange(e)
        }}
        onPaste={e => {
          const pastedValue = onPaste(e)
          this.setState({ inputValue: pastedValue })
        }}
        onFocus={() => {
          this.setState({ hasFocus: true })
          this.setState({ inputValue: numberValue || null })
          this.refs.decimalInputField.select()
        }}
        onBlur={() => {this.setState({ hasFocus: false })}}/>
    </div>
  }
}

export default ThousandSeparatedDecimalInput
