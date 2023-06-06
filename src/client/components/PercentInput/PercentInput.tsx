/* eslint-disable react/no-string-refs */
/* eslint-disable react/destructuring-assignment */
import './PercentInput.scss'
import React from 'react'

import * as R from 'ramda'
import { Numbers } from 'utils/numbers'

import { Sanitizer } from 'client/utils/sanitizer'

type State = any
type Props = {
  disabled: any
  numberValue: any
  onChange: any
  onPaste: any
}

export class PercentInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasFocus: false, inputValue: (props as any).numberValue }
  }

  render() {
    const { numberValue, onChange, onPaste, disabled } = this.props
    const value = this.state.inputValue || numberValue
    return (
      <div className="percent-input__container validation-error-sensitive-field" ref="wrapper">
        <div className="percent-input__readonly-view" style={{ visibility: this.state.hasFocus ? 'hidden' : 'visible' }}>
          {Numbers.format(numberValue)}
        </div>
        <input
          disabled={disabled}
          type="text"
          maxLength={6}
          className="percent-input__input-field no-print"
          ref="percentInputField"
          value={value || ''}
          style={{ opacity: this.state.hasFocus ? '1' : '0' }}
          onChange={(e) => {
            if (!Sanitizer.acceptableAsDecimal(e.target.value)) {
              return
            }
            this.setState({ inputValue: e.target.value })
            if (!R.pipe(R.path(['target', 'value']), R.defaultTo(''), R.endsWith('.'))(e)) onChange(e)
          }}
          onPaste={(e) => {
            const pastedValue = onPaste(e)
            this.setState({ inputValue: pastedValue })
          }}
          onFocus={() => {
            this.setState({ hasFocus: true })
            this.setState({ inputValue: numberValue || null })
            ;(this.refs.percentInputField as any).select()
          }}
          onBlur={() => {
            this.setState({ hasFocus: false })
          }}
        />
        <div className="percent-input__sign">%</div>
      </div>
    )
  }
}
export default PercentInput
