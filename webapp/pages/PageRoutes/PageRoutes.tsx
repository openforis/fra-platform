import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { useIsLogin } from '@webapp/components/hooks'
import { useAppDispatch, useAppSelector } from '@webapp/store'
import * as BasePaths from '@webapp/main/basePaths'

import DynamicImport from '@webapp/components/dynamicImport'
import Loading from '@webapp/components/loading'
import Landing from '@webapp/pages/Landing'
import Login from '@webapp/pages/Login'
import Header from '@webapp/components/Header'
import Footer from '@webapp/components/Footer'
import ErrorComponent from '@webapp/components/error/errorComponent'
import CountrySelect from '@webapp/components/CountrySelect'
import UserConsultationSurvey from '@webapp/components/UserConsultationSurvey'

import { FRA } from '@core/assessment'

import { useTranslation } from 'react-i18next'
import { useAppLoaded, AppActions } from '@webapp/store/app'

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
        <UserConsultationSurvey />
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
          <Route exact path={BasePaths.countryIso}>
            <Redirect to={`${window.location.pathname}/${FRA.type}/home`} />
          </Route>
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
