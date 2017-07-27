import React from 'react'
import './percentInput.less'

const renderValue = value =>
  typeof value === 'number' ? value : ''

export class PercentInput extends React.Component {
  constructor () {
    super()
    this.state = {hasFocus: false}
  }

  componentDidMount() {
    /*
     * For adjusting size
     */
    if (this.props.value) {
      this.forceUpdate()
    }
  }

  getWidth() {
    if (this.refs.wrapper) {
      return this.refs.wrapper.getBoundingClientRect().width -8
    }
    return null
  }

  render () {
    const width = this.getWidth()
    return <div className="percent__field" ref="wrapper">
      <div className="percent__readonly-view"
           style={{
             width: width ? `${width}px` : null,
             display: this.state.hasFocus ? 'none' : 'inline-block',
           }}
      >
        {renderValue(this.props.value)}
      </div>
      <div style={{opacity: this.state.hasFocus ? '1' : '0'}}>
        <input
          type="text"
          maxLength="3"
          value={renderValue(this.props.value)}
          onChange={ this.props.onChange }
          onPaste={ this.props.onPaste }
        />
      </div>
    </div>
  }
}
