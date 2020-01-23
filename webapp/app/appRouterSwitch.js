import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { initApp } from './actions'

import DynamicImport from '../components/dynamicImport'
import LoginView from '../login/loginView'
import Loading from '@webapp/components/loading'

import * as AppState from '@webapp/app/appState'

const AppRouterSwitch = props => {
  const { loggedIn, initApp, applicationStatus } = props

  useEffect(() => {
    initApp()
  }, [])

  // If application is not yet loaded, display Loading tucan bird
  if (applicationStatus !== AppState.stateLoadedKey) {
    return <Loading />
  }

  return (
    <Switch>
      {
        loggedIn ?
          <Route
            path="/country/:countryIso"
            render={props => <DynamicImport {...props} load={() => import('../loggedin/appViewExport')} />}
          />
          :
          <Route>
            <LoginView />
          </Route>
      }
    </Switch>
  )
}

const mapStateToProps = state => ({
  loggedIn: !!state.user.userInfo,
  applicationStatus: AppState.getApplicationStatus(state),
})

export default connect(mapStateToProps, {
  initApp
})(AppRouterSwitch)
