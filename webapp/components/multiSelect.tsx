import './multiSelect.less'
import React from 'react'
import * as R from 'ramda'

const optionClick = (currentValues: any, onChange: any, option: any) => (evt: any) => {
  evt.stopPropagation()
  if (R.contains(option, currentValues)) {
    onChange(R.reject(R.equals(option), currentValues))
  } else {
    onChange([...currentValues, option])
  }
}
const outsideClick = (that: any) => (evt: any) => {
  if (!that.refs.multiSelect.contains(evt.target)) {
    that.setState({ open: false })
  }
}
type MultiSelectState = any
type Props = any
export default class MultiSelect extends React.Component<{}, MultiSelectState> {
  props: Props
  outsideClick: any

  constructor(props: {}) {
    super(props)
    this.state = { open: false }
    this.outsideClick = outsideClick(this)
    window.addEventListener('click', this.outsideClick)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.outsideClick)
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }

  localizeOption(option: any) {
    return (this.props as any).i18n.t(`${(this.props as any).localizationPrefix}.${option}`)
  }

  render() {
    const { values = [] } = this.props
    return (
      <div
        ref="multiSelect"
        tabIndex={0}
        onMouseDown={this.toggleOpen.bind(this)}
        onFocus={() => this.setState({ open: true })}
        onBlur={() => this.setState({ open: false })}
        className={`multi-select ${this.state.open ? 'has-focus' : ''}`}
      >
        <div className="multi-select__closed-content">
          {R.isEmpty(values) ? (
            <span className="multi-select__placeholder">{(this.props as any).i18n.t('multiSelect.placeholder')}</span>
          ) : (
            R.pipe(
              R.map((option: any) => this.localizeOption(option)),
              R.join(', ')
            )(values)
          )}
        </div>
        <div className="multi-select__opened-content-anchor">
          {this.state.open ? (
            <div className="multi-select__opened">
              {R.map(
                (option: any) => (
                  <div
                    className="multi-select__opened-item"
                    key={option}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={optionClick(values, (this.props as any).onChange, option)}
                  >
                    <span className={`fra-checkbox ${R.contains(option, values) ? 'checked' : ''}`} />
                    <span className="multi-select__opened-item-label">{this.localizeOption(option)}</span>
                  </div>
                ),
                (this.props as any).options
              )}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
