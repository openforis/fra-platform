import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
import './numberInput.less'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { formatDecimal } from '@common/numberFormat'
import { acceptableAsDecimal } from '@webapp/utils/numberInput'

type State = any
export class ThousandSeparatedDecimalInput extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { hasFocus: false, inputValue: (props as any).numberValue }
  }

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberValue' does not exist on type 'Rea... Remove this comment to see the full error message
    const { numberValue, onChange, onPaste, disabled } = this.props
    const value = this.state.inputValue || numberValue
    return (
      <div className="number-input__container validation-error-sensitive-field" ref="wrapper">
        <div className="number-input__readonly-view" style={{ visibility: this.state.hasFocus ? 'hidden' : 'visible' }}>
          {formatDecimal(numberValue)}
        </div>
        <input
          type="text"
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
          maxLength="100"
          disabled={disabled}
          className="number-input__input-field no-print"
          ref="decimalInputField"
          value={value || ''}
          style={{ opacity: this.state.hasFocus ? '1' : '0' }}
          onChange={(e) => {
            if (!acceptableAsDecimal(e.target.value)) {
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
            ;(this.refs.decimalInputField as any).select()
          }}
          onBlur={() => {
            this.setState({ hasFocus: false })
          }}
        />
      </div>
    )
  }
}
export default ThousandSeparatedDecimalInput
