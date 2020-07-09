import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import DynamicImport from '@webapp/components/dynamicImport'
import Login from '@webapp/Login'
import Loading from '@webapp/components/loading'
import ErrorComponent from '@webapp/components/error/errorComponent'
import Footer from '@webapp/components/footer'
import Header from '@webapp/components/Header'
import Landing from '@webapp/app/landing'

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
    <>
      <Header />

      <Switch>
        <Route exact path={BasePaths.root} component={Landing} />

        <Route exact path={[BasePaths.login, BasePaths.resetPassword]} component={Login} />

        <Route
          path={[BasePaths.user, BasePaths.admin, BasePaths.country]}
          render={(props) => <DynamicImport {...props} load={() => import('../app/appViewExport')} />}
        />
      </Switch>

      <Footer />
      <ErrorComponent />
    </>
  )
}

export default Routes
