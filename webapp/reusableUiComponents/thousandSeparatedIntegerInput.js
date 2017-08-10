import React from 'react'
import './thousandSeparatedIntegerInput.less'
import { separateThousandsWithSpaces } from '../utils/numberFormat'

const renderFocusedIntegerValue = integerValue =>
  typeof integerValue === 'number' ? integerValue : ''

const renderUnfocusedIntegerValue = integerValue =>
  typeof integerValue === 'number' ? separateThousandsWithSpaces(integerValue) : ''

export class ThousandSeparatedIntegerInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  render () {
    const {integerValue, onChange, onPaste, className} = this.props
    return <div className="tsii__field validation-error-sensitive-field" style={{position: 'relative'}} ref="wrapper">
      <div className="tsii__readonly-view"
           style={{
              display: this.state.hasFocus ? 'none' : 'inline-block',
           }}
      >
        {renderUnfocusedIntegerValue(integerValue)}
      </div>
      <div style={{opacity: this.state.hasFocus ? '1' : '0'}}>
        <input
          type="text"
          maxLength="100"
          ref="inputField"
          className={className}
          value={renderFocusedIntegerValue(integerValue)}
          onChange={ onChange }
          onPaste={ onPaste }
          onFocus={
            () => {
              this.setState({hasFocus: true})
              this.refs.inputField.value = integerValue || null //prevent text "undefined" from rendering
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
