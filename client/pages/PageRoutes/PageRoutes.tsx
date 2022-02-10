// TODO Remove when CountrySelect implemented
import '@client/components/CountrySelect/countrySelect.scss'
import '@client/components/CountrySelect/CountryList/countryList.scss'

import React, { useEffect } from 'react'
import { /* Redirect, */ Route, /* RouteComponentProps, */ Switch } from 'react-router-dom'

// import { RegionCode } from '../../../core/country'
// import { FRA, PanEuropean } from '../../../core/assessment'
// import { useIsLogin } from '../../../webapp/hooks'
// import { useAppDispatch, useAppSelector } from '../../../webapp/store'

// import DynamicImport from '../../../webapp/components/dynamicImport'
import Loading from '@client/components/Loading'
import Landing from '@client/pages/Landing'
import Login from '@client/pages/Login'
import Toaster from '@client/components/Toaster'
import Header from '@client/components/Header'
import Footer from '@client/components/Footer'
// import ErrorComponent from '../../../webapp/components/error/errorComponent'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment } from '@client/store/assessment'
import { BasePaths } from '@client/basePaths'
// import { useIsLogin } from '@client/hooks'
import { Urls } from '@client/utils'
import { useTranslation } from 'react-i18next'
import CountrySelect from '@client/components/CountrySelect'
import Assessment from '@client/pages/Assessment'
import { useTheme } from './useTheme'

const PageRoutes: React.FC = () => {
  useTheme()
  const dispatch = useAppDispatch()
  const assessmentLoaded = useAssessment()
  const { i18n } = useTranslation()

  useEffect(() => {
    // TODO: Add user.language support
    const language = Urls.getRequestParam('lang') || localStorage.getItem('i18n/lang') || 'en'
    i18n.changeLanguage(language)
  }, [])

  useEffect(() => {
    dispatch(AssessmentActions.initApp())
  }, [])

  if (!assessmentLoaded) {
    return <Loading />
  }

  return (
    <>
      <Toaster />
      <Header />
      {/*
        Render CountrySelect if path matches '/' or '/assessment*'
      */}
      <Route exact path={[BasePaths.Root(), BasePaths.Assessment.root()]}>
        <CountrySelect />
      </Route>

      {/* <Route */}
      {/*  path={BasePaths.assessmentPrint} */}
      {/*  render={() => <DynamicImport load={() => import('../../../webapp/pages/AssessmentPrint/export')} />} */}
      {/* /> */}

      <Switch>
        <Route exact path={BasePaths.Root()} component={Landing} />

        <Route
          exact
          path={[BasePaths.Login.root(), BasePaths.Login.resetPassword(), BasePaths.Login.invitation()]}
          component={Login}
        />

        <Route path={BasePaths.Assessment.root()} component={Assessment} />

        {/* <Route */}
        {/*  path={BasePaths.admin} */}
        {/*  render={() => <DynamicImport key={1} load={() => import('../../../webapp/pages/Admin/export')} />} */}
        {/* /> */}
        {/* <Route */}
        {/*  path={BasePaths.user} */}
        {/*  render={() => <DynamicImport key={2} load={() => import('../../../webapp/pages/User/export')} />} */}
        {/* /> */}
        {/* <Route */}
        {/*  exact */}
        {/*  path={BasePaths.countryIso} */}
        {/*  render={(routeProps: RouteComponentProps<{ countryIso: string }>) => { */}
        {/*    const { countryIso } = routeProps.match.params */}
        {/*    const assessmentRedirect = countryIso === RegionCode.FE ? PanEuropean.type : FRA.type */}
        {/*    return <Redirect to={`${window.location.pathname}${assessmentRedirect}/home`} /> */}
        {/*  }} */}
        {/* /> */}
        {/* <Route */}
        {/*  path={BasePaths.assessment} */}
        {/*  render={() => <DynamicImport key={3} load={() => import('../../../webapp/app/appViewExport')} />} */}
        {/* /> */}
      </Switch>

      {/* <ErrorComponent /> */}
      <Footer />
    </>
  )
}

export default PageRoutes
