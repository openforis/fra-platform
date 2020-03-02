import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import DynamicImport from '@webapp/components/dynamicImport'
import LoginView from '@webapp/login/loginView'
import Loading from '@webapp/components/loading'

import * as AppState from '@webapp/app/appState'

import { initApp } from '@webapp/app/actions'

const Routes = () => {
  const dispatch = useDispatch()
  const appStatus = useSelector(AppState.getApplicationStatus)

  useEffect(() => {
    dispatch(initApp())
  }, [])

  // If application is not yet loaded, display Loading tucan bird
  if (appStatus !== AppState.stateLoadedKey) {
    return <Loading/>
  }

  return (
    <Switch>
      <Route path="/login">
        <LoginView/>
      </Route>
      <Route
        path={['/country/:countryIso/', '/']}
        render={props => (
          <DynamicImport
            {...props}
            load={() => import('../app/appViewExport')}/>
        )}
      />
      }
    </Switch>
  )
}

export default Routes
