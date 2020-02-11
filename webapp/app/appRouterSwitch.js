import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { initApp } from './actions'

import DynamicImport from '../components/dynamicImport'
import LoginView from '../login/loginView'
import Loading from '@webapp/components/loading'

import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'

const AppRouterSwitch = props => {
  const { loggedIn, initApp, applicationStatus } = props

  useEffect(() => {
    initApp()
  }, [])

  // If application is not yet loaded, display Loading tucan bird
  if (applicationStatus !== AppState.stateLoadedKey) {
    return <Loading/>
  }

  const { path, publicView } = loggedIn
    ? { path: '/country/:countryIso', publicView: false }
    : { path: '/public', publicView: true }

  return (
    <Switch>
      <Route
        path={path}
        render={props => (
          <DynamicImport
            {...props}
            public={publicView}
            load={() => import('../loggedin/appViewExport')}/>
        )}
      />
      <Route path="/login">
        <LoginView/>
      </Route>
      }
    </Switch>
  )
}

const mapStateToProps = state => ({
  loggedIn: !!UserState.getUserInfo(state),
  applicationStatus: AppState.getApplicationStatus(state),
})

export default connect(mapStateToProps, {
  initApp
})(AppRouterSwitch)
