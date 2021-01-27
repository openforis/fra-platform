import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
import './numberInput.less'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { formatInteger } from '@common/numberFormat'

type State = any
export class ThousandSeparatedIntegerInput extends React.Component<{}, State> {
  constructor() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()
    this.state = { hasFocus: false }
  }

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'integerValue' does not exist on type 'Re... Remove this comment to see the full error message
    const { integerValue, onChange, onPaste } = this.props
    return (
      <div className="number-input__container validation-error-sensitive-field" ref="wrapper">
        <div className="number-input__readonly-view" style={{ visibility: this.state.hasFocus ? 'hidden' : 'visible' }}>
          {formatInteger(integerValue)}
        </div>
        <input
          type="text"
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
          maxLength="100"
          disabled={(this.props as any).disabled}
          ref="integerInputField"
          className="number-input__input-field no-print"
          value={integerValue || ''}
          style={{ opacity: this.state.hasFocus ? '1' : '0' }}
          onChange={onChange}
          onPaste={onPaste}
          onFocus={() => {
            this.setState({ hasFocus: true })
            ;(this.refs.integerInputField as any).value = R.isNil(integerValue) ? null : integerValue // prevent text "undefined" from rendering
            ;(this.refs.integerInputField as any).select()
          }}
          onBlur={() => {
            this.setState({ hasFocus: false })
          }}
        />
      </div>
    )
  }
}
