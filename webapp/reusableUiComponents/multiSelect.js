import './multiSelect.less'
import React from 'react'
import R from 'ramda'

export default class MultiSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  toggleOpen() {
    this.setState({open: !this.state.open})
  }

  render () {
    const values = this.props.values || []
    return <div
      onClick={this.toggleOpen.bind(this)}
      className="multi-select">
      <div className="multi-select__closed-content">
        <div>first</div>
        <div>second</div>
        <div>third</div>
      </div>
      <svg className="icon icon-sub">
        <use xlinkHref="img/icons.svg#small-down"/>
      </svg>
      {
        this.state.open
          ? <div className="multi-select__opened">
          {
            R.map(
              option =>
                <div
                  key={option}
                  onClick={
                    () => {
                      this.props.onChange([option])
                    }
                  }>
                    <input type="checkbox" readOnly="true" name={option} value={option} checked={R.contains(option, values)}/>
                    {this.props.i18n.t(this.props.localizationPrefix + '.' + option)}
                  </div>,
              this.props.options
            )
          }
          </div>
          : null
      }
    </div>
  }
}
