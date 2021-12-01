import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { RegionCode } from '@core/meta/area'
import { FRA, PanEuropean } from '@core/assessment'
import { useIsLogin } from '@webapp/hooks'
import { useAppDispatch, useAppSelector } from '@webapp/store'
import * as BasePaths from '@webapp/main/basePaths'
import { AssessmentActions, useAssessmentLoaded } from '@client/store/assessment'

import Landing from '@client/pages/Landing'
import Login from '@webapp/pages/Login'
import { Header, Footer, Error, CountrySelect, Loading, DynamicImport } from '@client/components'

import { useTheme } from './useTheme'

const PageRoutes: React.FC = () => {
  useTheme()
  const dispatch = useAppDispatch()
  const appLoaded = useAssessmentLoaded()
  const isLogin = useIsLogin()
  const { language } = useAppSelector((state) => state.app)
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  useEffect(() => {
    dispatch(AssessmentActions.initApp(i18n))
  }, [])

  if (!appLoaded) {
    return <Loading />
  }

  const pathsLogin = [BasePaths.login, BasePaths.resetPassword]

  return (
    <Switch>
      <Route
        path={BasePaths.assessmentPrint}
        render={() => <DynamicImport load={() => import('@webapp/pages/AssessmentPrint/export')} />}
      />

      <Route>
        <Header />
        {!isLogin && <CountrySelect />}

        <Switch>
          <Route exact path={BasePaths.root} component={Landing} />
          <Route exact path={pathsLogin} component={Login} />
          <Route
            path={BasePaths.admin}
            render={() => <DynamicImport key={1} load={() => import('@webapp/pages/Admin/export')} />}
          />
          <Route
            path={BasePaths.user}
            render={() => <DynamicImport key={2} load={() => import('@webapp/pages/User/export')} />}
          />
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
            render={() => <DynamicImport key={3} load={() => import('@webapp/app/appViewExport')} />}
          />
        </Switch>

        <Footer />
        <Error />
      </Route>
    </Switch>
  )
}

export default PageRoutes
