import './style.less'
import * as R from 'ramda'

import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../login/actions'

class UserControl extends React.Component {
  componentWillMount () {
    this.setState({opened: false})
  }

  render () {
    const iconRefSuffix = this.state.opened ? 'down' : 'up'
    return <span
      className="footer__user-control"
      onClick={ evt => this.setState({opened: !this.state.opened}) }>
      {this.props.userName + ' '}
      <svg className="icon">
        <use xlinkHref={`img/icon.svg#icon-small-${iconRefSuffix}`}/>
      </svg>
      {
        this.state.opened
          ? <div onClick={() => this.props.logout()} className="footer__user-control-opened">
          Logout
        </div>
          : null
      }
    </span>
  }
}

const Footer = ({status, userInfo, path, width, ...props}) => {
  const style = {width: `calc(100vw - ${width}px)`}
  return <div className="footer__container" style={style}>
    {/* Placeholder for space-between flexbox alignment */}
    <div/>
    <div className="footer__item footer__autosave-status">{status}</div>
    <div className="footer__item">{userInfo ? <UserControl userName={userInfo.name} {...props}/> : ''}</div>
  </div>
}
const mapStateToProps = state => R.pipe(R.merge(state.autoSave), R.merge(state.user))(state.router)

export default connect(mapStateToProps, {logout})(Footer)
