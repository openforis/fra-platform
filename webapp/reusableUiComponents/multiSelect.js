import './multiSelect.less'
import React from 'react'
import R from 'ramda'

const optionClick = (currentValues, onChange, option) => (evt) => {
  evt.stopPropagation()
  if (R.contains(option, currentValues)) {
    onChange(R.reject(R.equals(option),  currentValues))
  } else {
    onChange([...currentValues, option])
  }
}

export default class MultiSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  toggleOpen() {
    this.setState({open: !this.state.open})
  }

  localizeOption(option) {
    return this.props.i18n.t(this.props.localizationPrefix + '.' + option)
  }

  render () {
    const values = this.props.values || []
    return <div
      onClick={this.toggleOpen.bind(this)}
      className="multi-select">
      <div className="multi-select__closed-content">
        {
          R.pipe(
            R.map(option => this.localizeOption(option)),
            R.join(', ')
          )(values)
        }
      </div>
      <div className="multi-select__arrow">
        <svg className="icon icon-sub">
          <use xlinkHref="img/icons.svg#small-down"/>
        </svg>
      </div>
      {
        this.state.open
          ? <div className="multi-select__opened" style={{width: this.props.openedListWidth}}>
          {
            R.map(
              option =>
                <div className="multi-select__opened-item"
                  key={option}
                  onClick={optionClick(values, this.props.onChange, option)}>
                  <input type="checkbox" readOnly="true" name={option} value={option} checked={R.contains(option, values)}/>
                  <span className="multi-select__opened-option-text">{this.localizeOption(option)}</span>
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
