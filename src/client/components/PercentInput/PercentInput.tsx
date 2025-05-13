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
  precision?: number
}

export class PercentInput extends React.Component<Props, State> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    precision: 3,
  }

  constructor(props: Props) {
    super(props)
    this.state = { hasFocus: false, inputValue: (props as any).numberValue }
  }

  render() {
    const { disabled, numberValue, onChange, onPaste, precision } = this.props
    // eslint-disable-next-line react/destructuring-assignment
    const value = this.state.inputValue || numberValue
    return (
      // eslint-disable-next-line react/no-string-refs
      <div ref="wrapper" className="percent-input__container validation-error-sensitive-field">
        <div
          className="percent-input__readonly-view"
          // eslint-disable-next-line react/destructuring-assignment
          style={{ visibility: this.state.hasFocus ? 'hidden' : 'visible' }}
        >
          {Numbers.format(numberValue, precision)}
        </div>
        <input
          // eslint-disable-next-line react/no-string-refs
          ref="percentInputField"
          className="percent-input__input-field no-print"
          disabled={disabled}
          maxLength={6}
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
            ;(this.refs.percentInputField as any).select()
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
        <div className="percent-input__sign">%</div>
      </div>
    )
  }
}
export default PercentInput
