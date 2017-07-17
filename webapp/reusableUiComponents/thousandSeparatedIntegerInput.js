import React from 'react'
import { separateThousandsWithSpaces } from '../utils/numberFormat'

const renderFocusedIntegerValue = integerValue =>
  typeof integerValue === 'number' ? integerValue : ''

const renderUnfocusedIntegerValue = integerValue =>
  typeof integerValue === 'number' ? separateThousandsWithSpaces(integerValue) : ''

export class ThousandSeparatedIntegerInput extends React.Component {
  render () {
    const {integerValue, onChange, onPaste, className} = this.props
    return <div>
      <div style={{position: 'absolute', left: -3000}}> {integerValue} </div>
      <input type="text"
                  maxLength="100"
                  ref="inputField"
                  className={className}
                  value={ this.hasFocus
                    ? renderFocusedIntegerValue(integerValue)
                    : renderUnfocusedIntegerValue(integerValue)
                  }
                  onChange={ onChange }
                  onPaste={ onPaste }
                  onFocus={
                    () => {
                      this.hasFocus = true
                      this.refs.inputField.value = integerValue || null //prevent text "undefined" from rendering
                    }
                  }
                  onBlur={
                    () => {
                      this.hasFocus = false
                      this.refs.inputField.value = separateThousandsWithSpaces(integerValue)
                    }
                  }
    />
  </div>
  }
}
