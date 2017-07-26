import React from 'react'
import './thousandSeparatedIntegerInput.less'
import { separateThousandsWithSpaces } from '../utils/numberFormat'

const renderFocusedIntegerValue = integerValue =>
  typeof integerValue === 'number' ? integerValue : ''

const renderUnfocusedIntegerValue = integerValue =>
  typeof integerValue === 'number' ? separateThousandsWithSpaces(integerValue) : ''

export class ThousandSeparatedIntegerInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  componentDidMount() {
    /*
     * This has to be done to adjust the size via getWidthForReadonly()
     * AFTER the first render. On first render, the ref "wrapper" will not
     * contain anything yet, but on second, it will and we can get the
     * width from it.
     */
    if (this.props.integerValue) {
      this.forceUpdate()
    }
  }

  getWidthForReadonly() {
    if (this.refs.wrapper) {
      return this.refs.wrapper.getBoundingClientRect().width -8
    }
    return null
  }

  render () {
    const {integerValue, onChange, onPaste, className} = this.props
    const widthForReadonly = this.getWidthForReadonly()
    return <div style={{position: 'relative'}} ref="wrapper">
      <div className="tsii__readonly-view"
           style={{
              width: widthForReadonly ? `${widthForReadonly}px` : null,
              display: this.state.hasFocus ? 'none' : 'inline-block',
           }}
      >
        {renderUnfocusedIntegerValue(integerValue)}
      </div>
      <div style={{opacity: this.state.hasFocus ? '1' : '0'}}>
        <input
          type="text"
          maxLength="100"
          ref="inputField"
          className={className}
          value={renderFocusedIntegerValue(integerValue)}
          onChange={ onChange }
          onPaste={ onPaste }
          onFocus={
            () => {
              this.setState({hasFocus: true})
              this.refs.inputField.value = integerValue || null //prevent text "undefined" from rendering
            }
          }
          onBlur={
            () => { this.setState({hasFocus: false}) }
          }
        />
      </div>
    </div>
  }
}
