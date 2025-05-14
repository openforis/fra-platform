import './ThousandSeparatedDecimalInput.scss'
import React from 'react'

import * as R from 'ramda'
import { Numbers } from 'utils/numbers'

import { Sanitizer } from 'client/utils/sanitizer'

type State = any
type Props = any
export class ThousandSeparatedDecimalInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasFocus: false, inputValue: (props as any).numberValue }
  }

  render() {
    const { disabled, numberValue, onChange, onPaste } = this.props
    // eslint-disable-next-line react/destructuring-assignment
    const value = this.state.inputValue || numberValue
    return (
      // eslint-disable-next-line react/no-string-refs
      <div ref="wrapper" className="number-input__container validation-error-sensitive-field">
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <div className="number-input__readonly-view" style={{ visibility: this.state.hasFocus ? 'hidden' : 'visible' }}>
          {Numbers.format(numberValue, 2)?.toString()}
        </div>
        <input
          // eslint-disable-next-line react/no-string-refs
          ref="decimalInputField"
          className="number-input__input-field no-print"
          disabled={disabled}
          maxLength={100}
          onBlur={() => {
            this.setState({ hasFocus: false })
          }}
          onChange={(e) => {
            if (!Sanitizer.acceptableAsDecimal(e.target.value)) {
              return
            }
            this.setState({ inputValue: e.target.value })
            if (!R.pipe(R.path(['target', 'value']), R.defaultTo(''), R.endsWith('.'))(e)) onChange(e)
          }}
          onFocus={() => {
            this.setState({ hasFocus: true })
            this.setState({ inputValue: numberValue || null })
            ;(this.refs.decimalInputField as any).select()
          }}
          onPaste={(e) => {
            const pastedValue = onPaste(e)
            this.setState({ inputValue: pastedValue })
          }}
          // eslint-disable-next-line react/destructuring-assignment
          style={{ opacity: this.state.hasFocus ? '1' : '0' }}
          type="text"
          value={value || ''}
        />
      </div>
    )
  }
}
export default ThousandSeparatedDecimalInput
