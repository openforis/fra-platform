import './style.less'
import * as R from 'ramda'

import React from 'react'
import { connect } from 'react-redux'

class UserControl extends React.Component {
  componentWillMount() {
    this.setState({opened: false})
  }
  render() {
    return <span className="footer__user-control">
      {this.props.userName + ' '}
      <svg onClick={ evt => this.setState({opened: true}) }
           className="icon">
        <use xlinkHref="img/icon.svg#icon-small-up"/>
      </svg>
      {this.state.opened ? <div className="footer__user-control-opened">Logout</div> : null}
    </span>
  }
}

const Footer = ({status, userInfo, path, width}) => {
  const style = {width: `calc(100vw - ${width}px)`}
  return <div className="footer__container" style={style} >
    {/* Placeholder for space-between flexbox alignment */}
    <div/>
    <div className="footer__item footer__autosave-status">{status}</div>
    <div className="footer__item">{userInfo ? <UserControl userName={userInfo.name}/> : ''}</div>
  </div>
}
const mapStateToProps = state => R.pipe(R.merge(state.autoSave), R.merge(state.user))(state.router)

export default connect(mapStateToProps)(Footer)
