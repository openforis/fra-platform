import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import { follow } from './actions'
import Notfound from '../notfound'
import { getLoggedinUserInfo } from '../user/actions'

class Router extends React.Component {

  follow () {
    if (window.location.hash === '') {
      window.location = '/login'
    } else if (!this.props.loggedInUserInfoLoaded) {
      this.props.getLoggedinUserInfo()
    }
    this.props.follow(location.hash)
  }

  componentWillMount () {
    window.onhashchange = () => {
      this.follow()
    }
    window.onload = () => {
      this.follow()
    }
  }

  render () {
    const route = R.find(route => route.route.match(this.props.path))(this.props.routes)
    return this.props.loggedInUserInfoLoaded
      ? route
        ? React.createElement(route.component, {match: {params: route.route.match(this.props.path)}})
        : <Notfound/>
      : null
  }
}

const mapStateToProps = state => {
  const path = state.router.path
    ? state.router.path
    : (window.location.hash || window.location.pathname)
  const loggedInUserInfoLoaded = !!state.user.userInfo
  return {path, loggedInUserInfoLoaded}
}

export default connect(mapStateToProps, {follow, getLoggedinUserInfo})(Router)
