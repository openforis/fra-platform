import React from 'react'
import './textInput.less'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import { isEmpty } from 'ramda'
import { elementOffset } from '@webapp/utils/domUtils'

type State = any
export default class TextInput extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    const placeholder = (this.props as any).placeholder || ''
    this.state = { hasFocus: false, placeholder }
  }

  componentDidUpdate(prevProps: {}, prevState: State, snapshot: any) {
    if ((this.props as any).value) {
      const row = (this.refs.readOnlyElement as any).closest('tr')
      if (row) {
        const { height } = elementOffset(this.refs.readOnlyElement)
        const { height: rowHeight } = elementOffset(row)
        row.style.height = `${Math.max(height, rowHeight, 40)}px`
      }
    }
  }

  render() {
    const isValueEmpty = isEmpty((this.props as any).value)
    const { disabled } = this.props as any
    return (
      <div className="text-input__container validation-error-sensitive-field">
        <div
          ref="readOnlyElement"
          className={`text-input__readonly-view ${isValueEmpty ? 'placeholder' : ''}`}
          style={{ visibility: this.state.hasFocus ? 'hidden' : 'visible' }}
        >
          {isValueEmpty ? this.state.placeholder : (this.props as any).value}
        </div>
        <input
          type="text"
          style={{ opacity: this.state.hasFocus ? '1' : '0' }}
          className="text-input__input-field no-print"
          ref="textInputField"
          value={(this.props as any).value || ''}
          onChange={(this.props as any).onChange}
          onPaste={(this.props as any).onPaste}
          onFocus={() => {
            this.setState({ hasFocus: true })
            ;(this.refs.textInputField as any).select()
          }}
          onBlur={() => {
            this.setState({ hasFocus: false })
          }}
          placeholder={this.state.placeholder}
          disabled={disabled}
        />
      </div>
    )
  }
}
