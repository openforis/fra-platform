import React from 'react'
import './textInput.less'
import { isEmpty } from 'ramda'
import { elementOffset } from '@webapp/utils/domUtils'

export default class TextInput extends React.Component {
  constructor (props) {
    super(props)
    const placeholder = this.props.placeholder || ''
    this.state = { hasFocus: false, placeholder }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.value) {
      const row = this.refs.readOnlyElement.closest('tr')
      if (row) {
        const { height } = elementOffset(this.refs.readOnlyElement)
        const { height: rowHeight } = elementOffset(row)
        row.style.height = Math.max(height, rowHeight, 40) + 'px'
      }
    }
  }

  render () {
    const isValueEmpty = isEmpty(this.props.value)
    const disabled = this.props.disabled

    return <div className="text-input__container validation-error-sensitive-field">
      <div
        ref="readOnlyElement"
        className={`text-input__readonly-view ${isValueEmpty ? 'placeholder' : ''}`}
        style={{ visibility: this.state.hasFocus ? 'hidden' : 'visible' }}>
        {isValueEmpty ? this.state.placeholder : this.props.value}
      </div>
      <input
        type="text"
        style={{ opacity: this.state.hasFocus ? '1' : '0' }}
        className="text-input__input-field no-print"
        ref="textInputField"
        value={this.props.value || ''}
        onChange={this.props.onChange}
        onPaste={this.props.onPaste}
        onFocus={
          () => {
            this.setState({ hasFocus: true })
            this.refs.textInputField.select()
          }
        }
        onBlur={() => { this.setState({ hasFocus: false }) }}
        placeholder={this.state.placeholder}
        disabled={disabled}
      />
    </div>
  }
}
