import React from 'react'
import * as R from 'ramda'

import './thousandSeparatedIntegerInput.less'
import { formatDecimal } from '../utils/numberFormat'
import { acceptableAsDecimal } from '../utils/numberInput'

export class ThousandSeparatedDecimalInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {hasFocus: false, inputValue: props.numberValue}
  }

  render () {
    const {numberValue, onChange, onPaste, className, precision = 2} = this.props
    const value = this.state.inputValue || numberValue

    return <div className="tsii__field validation-error-sensitive-field" ref="wrapper">
      <div className="tsii__readonly-view"
           style={{display: this.state.hasFocus ? 'none' : 'inline-block'}}>
        {formatDecimal(numberValue, precision)}
      </div>
      <input
        type="text"
        maxLength="100"
        disabled={this.props.disabled}
        className={className}
        value={value || ''}
        style={{opacity: this.state.hasFocus ? '1' : '0'}}
        onChange={e => {
          if (!acceptableAsDecimal(e.target.value)) {
            return
          }
          this.setState({inputValue: e.target.value})
          if (!R.pipe(R.path(['target', 'value']), R.defaultTo(''), R.endsWith('.'))(e))
            onChange(e)
        }
        }
        onPaste={e => {
          const pastedValue = onPaste(e)
          this.setState({inputValue: pastedValue})
        }
        }
        onFocus={
          () => {
            this.setState({hasFocus: true})
            this.setState({inputValue: numberValue || null})
          }
        }
        onBlur={
          () => { this.setState({hasFocus: false}) }
        }
      />
    </div>
  }
}
