import React from 'react'
import * as R from 'ramda'
import { Link } from 'react-router-dom'
import './popoverControl.less'

const mapIndexed = R.addIndex(R.map)
type State = any
type Props = any
export class PopoverControl extends React.Component<Props, State> {
  props: Props
  constructor(props: Props) {
    super(props)
    this.outsideClick = this.outsideClick.bind(this)
    window.addEventListener('click', this.outsideClick)
    this.state = {
      opened: false,
    }
  }

  outsideClick(evt: any) {
    if (!(this.refs.popoverControl as any).contains(evt.target)) this.setState({ opened: false })
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.outsideClick)
  }

  render() {
    const { children } = this.props
    const childClasses = this.state.opened
      ? `${(children as any).props.className} active`
      : (children as any).props.className
    return (
      <div
        className="popover-control__wrapper"
        ref="popoverControl"
        onClick={(evt) => this.setState({ opened: !this.state.opened })}
      >
        {React.cloneElement(children as any, { className: childClasses })}
        {this.state.opened ? this.renderItems((this.props as any).items) : null}
      </div>
    )
  }

  renderItems(items: any) {
    if (R.isEmpty(items)) return null
    return (
      <div className="popover-control__menu">
        {mapIndexed(
          (item: any, i: any) =>
            item.divider ? (
              <div className="popover-control__divider" key={i} />
            ) : item.link ? (
              <Link className="popover-control__item-link" key={i} to={item.link}>
                {item.content}
              </Link>
            ) : (
              <div className="popover-control__item" key={i} onClick={item.onClick}>
                {item.content}
              </div>
            ),
          items
        )}
      </div>
    )
  }
}
