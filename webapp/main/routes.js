import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

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
    return <Loading />
  }

  return (
    <Switch>
      <Route exact path={BasePaths.login}>
        <LoginView />
      </Route>
      <Route
        path={[BasePaths.statisticalFactsheets, `/country${BasePaths.country}`, BasePaths.country, BasePaths.root]}
        render={props => (
          <DynamicImport
            {...props}
            // eslint-disable-next-line
            load={() => import('../app/appViewExport')}
          />
        )}
      />
      }
    </Switch>
  )
}

export default Routes
