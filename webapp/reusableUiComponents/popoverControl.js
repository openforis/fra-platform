import React from 'react'
import * as R from 'ramda'
import './popoverControl.less'

export class PopoverControl extends React.Component {
  constructor (props) {
    super(props)
    this.outsideClick = this.outsideClick.bind(this)
    window.addEventListener('click', this.outsideClick)
  }

  outsideClick (evt) {
    if (!this.refs.popoverControl.contains(evt.target))
      this.setState({opened: false})
  }

  componentWillMount () {
    this.setState({opened: false})
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.outsideClick)
  }

  render () {
    const children = this.props.children
    const childClasses = this.state.opened ? `${children.props.className} active` : children.props.className

    return <div
      className="popover-control__wrapper"
      ref="popoverControl">
      <div onClick={evt => this.setState({opened: !this.state.opened})}>
        { React.cloneElement(children, { className: childClasses }) }
      </div>
    { this.state.opened ? this.renderItems(this.props.items) : null }

    </div>
  }

  renderItems(items) {
    if (R.isEmpty(items)) return null
    return <div className="popover-control__menu">
      {
        R.map(item =>
          item.divider
          ? <div className="popover-control__divider" key="divider"></div>
          : <div className="popover-control__item" key={item.label} onClick={item.onClick}>
              {item.label}
            </div>
          , items)
      }
    </div>
  }
}
