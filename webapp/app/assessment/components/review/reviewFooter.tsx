import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
import { EmojiPicker, EmojiPickerController } from '@webapp/components/emoji'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'

type State = any
class FraReviewFooter extends React.Component<{}, State> {
  initialState: any

  constructor(props: {}) {
    super(props)
    this.initialState = { message: '', showPicker: false, messageCursorPosition: 0 }
    this.state = this.initialState
    this.outsideClick = this.outsideClick.bind(this)
    window.addEventListener('click', this.outsideClick)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.outsideClick)
  }

  outsideClick(evt: any) {
    if (
      this.state.showPicker &&
      !(this.refs.emojiPicker as any).contains(evt.target) &&
      !(this.refs.emojiPickerToggleButton as any).contains(evt.target)
    )
      this.closePicker()
  }

  onInputChange(evt: any) {
    this.setState({ ...this.state, message: evt.target.value })
  }

  onInputKeyDown(evt: any) {
    if (evt.keyCode === 13 && evt.metaKey && (this.props as any).onSubmit) {
      this.onSubmit()
    }
  }

  onInputFocus(evt: any) {
    this.closePicker()
    this.registerInputPosition(evt)
  }

  registerInputPosition(evt: any) {
    this.setState({ ...this.state, messageCursorPosition: evt.target.selectionStart })
  }

  onSubmit() {
    const msg = this.state.message
    if (!R.isEmpty(R.trim(msg))) {
      this.setState(this.initialState)
      ;(this.props as any).onSubmit(msg)
    }
  }

  closePicker() {
    if (this.state.showPicker) this.setState({ ...this.state, showPicker: false })
  }

  showPicker() {
    this.setState({
      ...this.state,
      showPicker: true,
      pickerStyle: { bottom: (this.refs.textField as any).refs.textArea.offsetHeight + 60 },
    })
  }

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'placeholder' does not exist on type 'Rea... Remove this comment to see the full error message
    const { placeholder, i18n, submitBtnLabel, cancelBtnLabel, onCancel, submitAllowed = true } = this.props
    const submitBtnDisabled = R.isEmpty(R.trim(this.state.message)) || !submitAllowed
    return submitAllowed ? (
      <div className="fra-review__footer">
        <div className="fra-review__footer-input-wrapper">
          <div ref="emojiPicker">
            {this.state.showPicker ? (
              <EmojiPicker
                onClick={(emoji: any) => {
                  this.setState({
                    ...this.state,
                    showPicker: false,
                    message: R.insert(this.state.messageCursorPosition, emoji, this.state.message).join(''),
                    messageCursorPosition: this.state.messageCursorPosition + emoji.length,
                  })
                }}
                style={this.state.pickerStyle}
                i18n={i18n}
              />
            ) : null}
          </div>

          <VerticallyGrowingTextField
            ref="textField"
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            onChange={(evt: any) => this.onInputChange(evt)}
            onKeyDown={(evt: any) => this.onInputKeyDown(evt)}
            onFocus={(evt: any) => this.onInputFocus(evt)}
            onKeyUp={(evt: any) => this.registerInputPosition(evt)}
            onClick={(evt: any) => this.registerInputPosition(evt)}
            value={this.state.message}
            className="fra-review__footer-input"
            placeholder={placeholder}
            disabled={!submitAllowed}
          />

          <div ref="emojiPickerToggleButton">
            <EmojiPickerController onClick={() => this.showPicker()} />
          </div>
        </div>

        <div className="fra-review__footer-buttons">
          <button
            className="fra-review__footer-add-btn btn-s btn-primary"
            onClick={() => this.onSubmit()}
            disabled={submitBtnDisabled}
          >
            {submitBtnLabel}
          </button>
          <button className="btn-s btn-secondary" onClick={() => onCancel()}>
            {cancelBtnLabel}
          </button>
        </div>
      </div>
    ) : null
  }
}
export default FraReviewFooter
