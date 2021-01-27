import React from 'react'
import * as R from 'ramda'

import { EmojiPicker, EmojiPickerController } from '@webapp/components/emoji'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'

class FraReviewFooter extends React.Component {

  constructor (props) {
    super(props)
    this.initialState = {message: '', showPicker: false, messageCursorPosition: 0}
    this.state = this.initialState

    this.outsideClick = this.outsideClick.bind(this)
    window.addEventListener('click', this.outsideClick)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.outsideClick)
  }

  outsideClick (evt) {
    if (
      this.state.showPicker
      && !this.refs.emojiPicker.contains(evt.target)
      && !this.refs.emojiPickerToggleButton.contains(evt.target)
    )
      this.closePicker()
  }

  onInputChange (evt) {
    this.setState({...this.state, message: evt.target.value})
  }

  onInputKeyDown (evt) {
    if (evt.keyCode === 13 && evt.metaKey && this.props.onSubmit) {
      this.onSubmit()
    }
  }

  onInputFocus (evt) {
    this.closePicker()
    this.registerInputPosition(evt)
  }

  registerInputPosition (evt) {
    this.setState({...this.state, messageCursorPosition: evt.target.selectionStart})
  }

  onSubmit () {
    const msg = this.state.message
    if (!R.isEmpty(R.trim(msg))) {
      this.setState(this.initialState)
      this.props.onSubmit(msg)
    }
  }

  closePicker () {
    if (this.state.showPicker)
      this.setState({...this.state, showPicker: false})
  }

  showPicker () {
    this.setState({
      ...this.state,
      showPicker: true,
      pickerStyle: {bottom: this.refs.textField.refs.textArea.offsetHeight + 60}
    })
  }

  render () {
    const {
      placeholder,
      i18n,
      submitBtnLabel,
      cancelBtnLabel,
      onCancel,
      submitAllowed = true
    } = this.props

    const submitBtnDisabled = R.isEmpty(R.trim(this.state.message)) || !submitAllowed

    return submitAllowed ?
      <div className="fra-review__footer">

        <div className="fra-review__footer-input-wrapper">
          <div ref="emojiPicker">
            {
              this.state.showPicker
                ? <EmojiPicker
                  onClick={emoji => {
                    this.setState({
                      ...this.state,
                      showPicker: false,
                      message: R.insert(this.state.messageCursorPosition, emoji, this.state.message).join(''),
                      messageCursorPosition: this.state.messageCursorPosition + emoji.length
                    })
                  }}
                  style={this.state.pickerStyle}
                  i18n={i18n}
                />
                : null
            }
          </div>

          <VerticallyGrowingTextField
            ref="textField"
            onChange={evt => this.onInputChange(evt)}
            onKeyDown={evt => this.onInputKeyDown(evt)}
            onFocus={evt => this.onInputFocus(evt)}
            onKeyUp={evt => this.registerInputPosition(evt)}
            onClick={evt => this.registerInputPosition(evt)}
            value={this.state.message}
            className="fra-review__footer-input"
            placeholder={placeholder}
            disabled={!submitAllowed}/>

          <div ref="emojiPickerToggleButton">
            <EmojiPickerController onClick={() => this.showPicker()}/>
          </div>

        </div>

        <div className="fra-review__footer-buttons">
          <button className="fra-review__footer-add-btn btn-s btn-primary"
                  onClick={() => this.onSubmit()}
                  disabled={submitBtnDisabled}>
            {submitBtnLabel}
          </button>
          <button className="btn-s btn-secondary"
                  onClick={() => onCancel()}>
            {cancelBtnLabel}
          </button>
        </div>

      </div>

      : null
  }

}

export default FraReviewFooter
