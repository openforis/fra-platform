import React from 'react'
import './percentInput.less'

const renderValue = value =>
  typeof value === 'number' ? value : ''

export class PercentInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  componentDidMount () {
    /*
     * For adjusting size
     */
    if (this.props.value) {
      this.forceUpdate()
    }
  }

  getWidth () {
    if (this.refs.wrapper) {
      return this.refs.wrapper.getBoundingClientRect().width - 8
    }
    return null
  }

  render () {
    const width = this.getWidth()
    return <div className="percent__field" ref="wrapper">
      <div className="percent__readonly-view percent__value-container"
           style={{
             width: width ? `${width}px` : null,
             display: this.state.hasFocus ? 'none' : 'inline-block',
           }}
      >
        {renderValue(this.props.value)}
      </div>
      <div style={{display: 'inline-block', opacity: this.state.hasFocus ? '1' : '0'}}>
        <input
          className="percent__input-field percent__value-container"
          type="text"
          maxLength="3"
          value={ renderValue(this.props.value) }
          onChange={ this.props.onChange }
          onPaste={ this.props.onPaste }
          onFocus={ () => { this.setState({hasFocus: true}) } }
          onBlur={ () => { this.setState({hasFocus: false}) } }
        />
      </div>
      % &nbsp;
    </div>
  }
}
