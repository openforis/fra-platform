import React from 'react'
import * as R from 'ramda'

import './thousandSeparatedIntegerInput.less'
import { separateDecimalThousandsWithSpaces } from '../utils/numberFormat'
import { acceptableAsDecimal } from '../utils/numberInput'

const renderFocusedIntegerValue = integerValue =>
  typeof integerValue === 'number' ? integerValue.toString() : integerValue

const renderUnfocusedIntegerValue = (integerValue, prec) => separateDecimalThousandsWithSpaces(integerValue, prec)

export class ThousandSeparatedDecimalInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false, inputValue: null}
  }

  render () {
    const {integerValue, onChange, onPaste, className, precision = 0} = this.props
    const value = renderFocusedIntegerValue(this.state.inputValue || integerValue)
    return <div className="tsii__field validation-error-sensitive-field" ref="wrapper">
      <div className="tsii__readonly-view"
           style={{
             display: this.state.hasFocus ? 'none' : 'inline-block',
           }}
      >
        {renderUnfocusedIntegerValue(integerValue, precision)}
      </div>
      <div style={{opacity: this.state.hasFocus ? '1' : '0'}}>
        <input
          type="text"
          maxLength="100"
          disabled={this.props.disabled}
          className={className}
          value={value || ''}
          onChange={ e  => {
            if(!acceptableAsDecimal(e.target.value)) {
              return
            }
            this.setState({inputValue: e.target.value})
            if(!R.pipe(R.path(['target', 'value']), R.defaultTo(''), R.endsWith('.'))(e))
              onChange(e)
          }
          }
          onPaste={ onPaste }
          onFocus={
            () => {
              this.setState({hasFocus: true})
              this.setState({inputValue: integerValue || null})
            }
          }
          onBlur={
            () => { this.setState({hasFocus: false}) }
          }
        />
      </div>
    </div>
  }
}
