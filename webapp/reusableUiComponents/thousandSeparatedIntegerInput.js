import React from 'react'
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
  render () {
    const {integerValue, onChange, onPaste, className} = this.props
    return <div style={{position: 'relative'}} ref="wrapper">
      <div style={{
        position: 'absolute',
        right: '5px',
        top: '9px',
        height: '17px',
        width: this.refs.wrapper ? `${this.refs.wrapper.getBoundingClientRect().width -8}px` : null,
        display: this.state.hasFocus ? 'none' : 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
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
            () => {
              this.setState({hasFocus: false})
              this.refs.inputField.value = separateThousandsWithSpaces(integerValue)
            }
          }
        />
      </div>
    </div>
  }
}
