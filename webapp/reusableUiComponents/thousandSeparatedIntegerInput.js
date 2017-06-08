import React from 'react'
import { separateThousandsWithSpaces } from '../utils/numberFormat'

export class ThousandSeparatedIntegerInput extends React.Component {
  render () {
    const {integerValue, onChange, onPaste} = this.props
    return <input type="text"
                  ref="inputField"
                  value={ this.hasFocus ? integerValue : separateThousandsWithSpaces(integerValue) }
                  onChange={ onChange }
                  onPaste={ onPaste }
                  onFocus={
                    () => {
                      this.hasFocus = true
                      this.refs.inputField.value = integerValue
                    }
                  }
                  onBlur={
                    () => {
                      this.hasFocus = false
                      this.refs.inputField.value = separateThousandsWithSpaces(integerValue)
                    }
                  }
    />
  }
}
