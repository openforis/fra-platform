import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { RegionCode } from '@core/country'
import { FRA, PanEuropean } from '@core/assessment'
import { useIsLogin } from '@webapp/hooks'
import { useAppDispatch, useAppSelector } from '@webapp/store'
import * as BasePaths from '@webapp/main/basePaths'
import { AppActions, useAppLoaded } from '@webapp/store/app'

import DynamicImport from '@webapp/components/dynamicImport'
import Loading from '@webapp/components/loading'
import Landing from '@webapp/pages/Landing'
import Login from '@webapp/pages/Login'
import Header from '@webapp/components/Header'
import Footer from '@webapp/components/Footer'
import ErrorComponent from '@webapp/components/error/errorComponent'
import CountrySelect from '@webapp/components/CountrySelect'

import { useTheme } from './useTheme'

const PageRoutes: React.FC = () => {
  useTheme()
  const dispatch = useAppDispatch()
  const appLoaded = useAppLoaded()
  const isLogin = useIsLogin()
  const { language } = useAppSelector((state) => state.app)
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  useEffect(() => {
    dispatch(AppActions.initApp(i18n))
  }, [])

  if (!appLoaded) {
    return <Loading />
  }

  const pathsLogin = [BasePaths.login, BasePaths.resetPassword]

  return (
    <Switch>
      <Route
        path={BasePaths.assessmentPrint}
        render={() => <DynamicImport load={() => import('../AssessmentPrint/export')} />}
      />

      <Route>
        <Header />
        {!isLogin && <CountrySelect />}

        <Switch>
          <Route exact path={BasePaths.root} component={Landing} />
          <Route exact path={pathsLogin} component={Login} />
          <Route
            path={BasePaths.admin}
            render={() => <DynamicImport key={1} load={() => import('../Admin/export')} />}
          />
          <Route path={BasePaths.user} render={() => <DynamicImport key={2} load={() => import('../User/export')} />} />
          <Route
            exact
            path={BasePaths.countryIso}
            render={(routeProps: RouteComponentProps<{ countryIso: string }>) => {
              const { countryIso } = routeProps.match.params
              const assessmentRedirect = countryIso === RegionCode.FE ? PanEuropean.type : FRA.type
              return <Redirect to={`${window.location.pathname}${assessmentRedirect}/home`} />
            }}
          />
          <Route
            path={BasePaths.assessment}
            render={() => <DynamicImport key={3} load={() => import('../../app/appViewExport')} />}
          />
        </Switch>

        <Footer />
        <ErrorComponent />
      </Route>
    </Switch>
  )
}

export default PageRoutes
