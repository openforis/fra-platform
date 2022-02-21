/* eslint-disable react/static-property-placement */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import * as R from 'ramda'
import './ThousandSeparatedIntegerInput.scss'
import { Numbers } from '@core/utils'

type State = any
type Props = any
class ThousandSeparatedIntegerInput extends React.Component<Props, State> {
  props: Props

  constructor(props: Props) {
    super(props)
    this.state = { hasFocus: false }
  }

  render() {
    const { integerValue, onChange, onPaste } = this.props
    return (
      // eslint-disable-next-line react/no-string-refs
      <div className="number-input__container validation-error-sensitive-field" ref="wrapper">
        <div className="number-input__readonly-view" style={{ visibility: this.state.hasFocus ? 'hidden' : 'visible' }}>
          {Numbers.format(integerValue)}
        </div>
        <input
          type="text"
          maxLength={100}
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
export default ThousandSeparatedIntegerInput
