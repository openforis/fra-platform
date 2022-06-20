// TODO Remove when CountrySelect implemented
import '@client/components/CountrySelect/countrySelect.scss'
import '@client/components/CountrySelect/CountryList/countryList.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useMatch } from 'react-router-dom'

// import ErrorComponent from '../../../webapp/components/error/errorComponent'
import { useAppDispatch } from '@client/store'
import { AssessmentActions } from '@client/store/assessment'
import { ClientRoutes } from '@client/clientRoutes'
import CountrySelect from '@client/components/CountrySelect'
import Footer from '@client/components/Footer'
import Header from '@client/components/Header'
import Toaster from '@client/components/Toaster'
import Assessment from '@client/pages/Assessment'
import Geo from '@client/pages/Geo'
// import { RegionCode } from '../../../core/country'
// import { FRA, PanEuropean } from '../../../core/assessment'
// import { useIsLogin } from '../../../webapp/hooks'
// import { useAppDispatch, useAppSelector } from '../../../webapp/store'
// import DynamicImport from '../../../webapp/components/dynamicImport'
import Landing from '@client/pages/Landing'
import Login from '@client/pages/Login'
import { SocketClient } from '@client/service/socket'
// import { useIsLogin } from '@client/hooks'
import { Urls } from '@client/utils'

import { useTheme } from './useTheme'

const PageRoutes: React.FC = () => {
  useTheme()
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const shouldRenderCountrySelect = !useMatch(ClientRoutes.Login.root)

  useEffect(() => {
    // TODO: Add user.language support
    const language = Urls.getRequestParam('lang') || localStorage.getItem('i18n/lang') || 'en'
    i18n.changeLanguage(language)

    SocketClient.open()

    return () => {
      SocketClient.close()
    }
  }, [])

  useEffect(() => {
    dispatch(AssessmentActions.initApp())
  }, [])

  return (
    <>
      <Toaster />
      <Header />

      {shouldRenderCountrySelect && <CountrySelect />}

      {/* <Route */}
      {/*  path={BasePaths.assessmentPrint} */}
      {/*  render={() => <DynamicImport load={() => import('../../../webapp/pages/AssessmentPrint/export')} />} */}
      {/* /> */}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path={ClientRoutes.Assessment.root.path} element={<Assessment />} />
        <Route path={ClientRoutes.Login.root.path} element={<Login />} />
        <Route path={ClientRoutes.Geo.root.path} element={<Geo />} />
        <Route path="*" element={<Navigate to="/" replace />} />

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
      </Routes>

      {/* <ErrorComponent /> */}
      <Footer />
    </>
  )
}

export default PageRoutes
