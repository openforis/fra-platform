import React from 'react'
import * as R from 'ramda'

import { Link } from '../reusableUiComponents/link'

import './popoverControl.less'

const mapIndexed = R.addIndex(R.map)

export class PopoverControl extends React.Component {
  constructor (props) {
    super(props)
    this.outsideClick = this.outsideClick.bind(this)
    window.addEventListener('click', this.outsideClick)
    this.state = {
      opened: false
    }
  }

  outsideClick (evt) {
    if (!this.refs.popoverControl.contains(evt.target))
      this.setState({opened: false})
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.outsideClick)
  }

  render () {
    const children = this.props.children
    const childClasses = this.state.opened ? `${children.props.className} active` : children.props.className

    return <div className="popover-control__wrapper"
                ref="popoverControl"
                onClick={evt => this.setState({opened: !this.state.opened})}>
      {React.cloneElement(children, {className: childClasses})}
      {this.state.opened ? this.renderItems(this.props.items) : null}
    </div>
  }

  renderItems (items) {
    if (R.isEmpty(items)) return null
    return <div className="popover-control__menu">
      {
        mapIndexed((item, i) =>
            item.divider
              ? <div className="popover-control__divider" key={i}></div>
              : item.link
              ? <Link className="popover-control__item-link" key={i} to={item.link}>
                {item.content}
              </Link>
              : <div className="popover-control__item" key={i} onClick={item.onClick}>
                {item.content}
              </div>
          , items)
      }
    </div>
  }
}
