import React from 'react'
import * as R from 'ramda'
import './percentInput.less'
import { formatDecimal } from '@webapp/utils/numberFormat'
import { acceptableAsDecimal } from '@webapp/utils/numberInput'

export class PercentInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {hasFocus: false, inputValue: props.numberValue}
  }

  render () {
    const {numberValue, onChange, onPaste, disabled} = this.props
    const value = this.state.inputValue || numberValue

    return <div className="percent-input__container validation-error-sensitive-field" ref="wrapper">
      <div className="percent-input__readonly-view" style={{visibility: this.state.hasFocus ? 'hidden' : 'visible'}}>
        {formatDecimal(numberValue)}
      </div>
      <input
        disabled={disabled}
        type="text"
        maxLength="6"
        className="percent-input__input-field no-print"
        ref="percentInputField"
        value={value || ''}
        style={{opacity: this.state.hasFocus ? '1' : '0'}}
        onChange={e => {
          if (!acceptableAsDecimal(e.target.value)) {
            return
          }
          this.setState({inputValue: e.target.value})
          if (!R.pipe(R.path(['target', 'value']), R.defaultTo(''), R.endsWith('.'))(e))
            onChange(e)
        }}
        onPaste={e => {
          const pastedValue = onPaste(e)
          this.setState({inputValue: pastedValue})
        }}
        onFocus={() => {
          this.setState({hasFocus: true})
          this.setState({inputValue: numberValue || null})
          this.refs.percentInputField.select()
        }}
        onBlur={() => {this.setState({hasFocus: false})}} />
      <div className="percent-input__sign">%</div>
    </div>
  }
}

export default PercentInput
