import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import * as Cookies from 'js-cookie'

import { follow } from './actions'
import Notfound from '../notfound'
import { getLoggedinUserInfo } from '../login/actions'

class Router extends React.Component {

  follow () {
    const loggedInCookie = R.defaultTo('false')(Cookies.get('loggedIn'))
    if (loggedInCookie === 'false' && location.hash !== '') {
      // "redirecting" user when user has not authenticated or session has ran out
      window.location.hash = ''
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
    return (route
      ? React.createElement(route.component, {match: {params: route.route.match(this.props.path)}})
      : <Notfound/>)
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
