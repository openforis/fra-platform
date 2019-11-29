import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import { follow } from './actions'
import Notfound from '../app/notfound'
import { fetchInitialData } from '../app/actions'
import Route from 'route-parser'

const getCountryIsoFromPath = (path) => {
  const match = new Route('/country/:countryIso*whatever').match(path.replace('#', ''))
  return match ? match.countryIso : null
}

class Router extends React.Component {

  follow () {
    if (window.location.hash === '') {
      window.location = '/login'
    } else if (!this.props.initialDataLoaded) {
      this.props.fetchInitialData(getCountryIsoFromPath(this.props.path))
    }
    this.props.follow(location.hash)
  }

  componentDidMount () {
    window.onhashchange = () => {
      this.follow()
    }
    window.onload = () => {
      this.follow()
    }
  }

  render () {
    const route = R.find(route => route.route.match(this.props.path))(this.props.routes)
    return this.props.initialDataLoaded
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
  // We use userInfo as the test to see if initial data is loaded already because it's so essential
  const initialDataLoaded = !!state.user.userInfo
    && !!R.path(['country', 'countries'], state)
    && !R.isEmpty(state.extentOfForest)
    && !R.isEmpty(state.growingStock)

  return {path, initialDataLoaded}
}

export default connect(mapStateToProps, {follow, fetchInitialData})(Router)
