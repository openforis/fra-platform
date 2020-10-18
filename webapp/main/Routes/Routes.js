import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import { useIsLogin } from '@webapp/components/hooks'
import DynamicImport from '@webapp/components/dynamicImport'
import Loading from '@webapp/components/loading'
import Landing from '@webapp/pages/Landing'
import Login from '@webapp/pages/Login'
import Header from '@webapp/components/Header'
import CountrySelection from '@webapp/components/countrySelection'
import Footer from '@webapp/components/footer'
import ErrorComponent from '@webapp/components/error/errorComponent'

import * as AppState from '@webapp/app/appState'
import { initApp } from '@webapp/app/actions'

import { useTheme } from './useTheme'

const Routes = () => {
  useTheme()
  const dispatch = useDispatch()
  const appStatus = useSelector(AppState.getApplicationStatus)
  const isLogin = useIsLogin()

  useEffect(() => {
    dispatch(initApp())
  }, [])

  // If application is not yet loaded, display Loading tucan bird
  if (appStatus !== AppState.stateLoadedKey) {
    return <Loading />
  }

  const pathsLogin = [BasePaths.login, BasePaths.resetPassword]

  return (
    <Switch>
      <Route
        exact
        path={[BasePaths.assessmentPrint, BasePaths.assessmentPrintOnlyTables]}
        render={() => <DynamicImport load={() => import('../../pages/AssessmentPrint/export')} />}
      />

      <Route>
        <Header />
        {!isLogin && <CountrySelection />}

        <Switch>
          <Route exact path={BasePaths.root} component={Landing} />
          <Route exact path={pathsLogin} component={Login} />
          <Route
            path={BasePaths.admin}
            render={() => <DynamicImport load={() => import('../../app/appViewExport')} />}
          />
          <Route
            path={BasePaths.user}
            render={() => <DynamicImport load={() => import('../../app/appViewExport')} />}
          />
          <Route
            path={BasePaths.assessment}
            render={() => <DynamicImport load={() => import('../../app/appViewExport')} />}
          />
        </Switch>

        <Footer />
        <ErrorComponent />
      </Route>
    </Switch>
  )
}

export default Routes
