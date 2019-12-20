import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { initApp } from './actions'

import DynamicImport from '../components/dynamicImport'
import LoginView from '../login/loginView'


const AppRouterSwitch = props => {
  const { loggedIn, initApp } = props

  useEffect(() => {
    initApp()
  }, [])

  return (
    <Switch>
      {
        loggedIn ?
          <Route
            path="/country/:countryIso"
            render={props => <DynamicImport {...props} load={() => import('../loggedin/appViewExport')} />}
          />
          :
          <Route path="/login/">
            <LoginView />
          </Route>
      }
    </Switch>
  )

}

const mapStateToProps = state => ({
  loggedIn: !!state.user.userInfo
})

export default connect(mapStateToProps, {
  initApp
})(AppRouterSwitch)
