import '@client/components/CountrySelect/countrySelect.scss'
import '@client/components/CountrySelect/CountryList/countryList.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useMatch } from 'react-router-dom'

import { useAppDispatch } from '@client/store'
import { AssessmentActions } from '@client/store/assessment'
import { useIsPrint } from '@client/hooks/useIsPath'
import { ClientRoutes } from '@client/clientRoutes'
import CountrySelect from '@client/components/CountrySelect'
import Footer from '@client/components/Footer'
import Header from '@client/components/Header'
import Toaster from '@client/components/Toaster'
import Assessment from '@client/pages/Assessment'
import AssessmentPrint from '@client/pages/AssessmentPrint'
import Geo from '@client/pages/Geo'
import Landing from '@client/pages/Landing'
import Login from '@client/pages/Login'
import { SocketClient } from '@client/service/socket'
import { Urls } from '@client/utils'

import { useTheme } from './useTheme'

const PageRoutes: React.FC = () => {
  useTheme()
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const { print } = useIsPrint()

  const shouldRenderCountrySelect = !useMatch(ClientRoutes.Login.Root.path.absolute) && !print

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
      {!print && <Header />}

      {shouldRenderCountrySelect && <CountrySelect />}

      <Routes>
        <Route path={ClientRoutes.Assessment.Print.path.absolute} element={<AssessmentPrint />} />

        <Route path="/" element={<Landing />} />
        <Route path={`${ClientRoutes.Assessment.Root.path.absolute}/*`} element={<Assessment />} />
        <Route path={`${ClientRoutes.Login.Root.path.absolute}/*`} element={<Login />} />
        <Route path={`${ClientRoutes.Geo.Root.path.absolute}/*`} element={<Geo />} />
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
