import '@client/components/CountrySelect/countrySelect.scss'
import '@client/components/CountrySelect/CountryList/countryList.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'

import { useAppDispatch } from '@client/store'
import { AssessmentActions } from '@client/store/assessment'
import { useIsPrint } from '@client/hooks/useIsPath'
import Footer from '@client/components/Footer'
import Header from '@client/components/Header'
import Toaster from '@client/components/Toaster'
import Admin from '@client/pages/Admin'
import Assessment from '@client/pages/Assessment'
import AssessmentPrint from '@client/pages/AssessmentPrint'
import Geo from '@client/pages/Geo'
import Landing from '@client/pages/Landing'
import Login from '@client/pages/Login'
import User from '@client/pages/User'
import { SocketClient } from '@client/service/socket'
import { Urls } from '@client/utils'

import { useTheme } from './useTheme'

const PageRoutes: React.FC = () => {
  useTheme()
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const { print } = useIsPrint()

  useEffect(() => {
    // TODO: Add user.language support
    const language = Urls.getRequestParam('lang') || localStorage.getItem('i18n/lang') || 'en'
    i18n.changeLanguage(language)

    SocketClient.open()

    return () => {
      SocketClient.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(AssessmentActions.initApp())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Toaster />
      {!print && <Header />}

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path={ClientRoutes.Assessment.Print.path.absolute} element={<AssessmentPrint />} />
        <Route path={ClientRoutes.Assessment.PrintTables.path.absolute} element={<AssessmentPrint />} />
        <Route path={`${ClientRoutes.Admin.Root.path.absolute}/*`} element={<Admin />} />
        <Route path={`${ClientRoutes.Assessment.Root.path.absolute}/*`} element={<Assessment />} />
        <Route path={`${ClientRoutes.Login.Root.path.absolute}/*`} element={<Login />} />
        <Route path={`${ClientRoutes.Geo.Root.path.absolute}/*`} element={<Geo />} />
        <Route path={`${ClientRoutes.Users.User.path.absolute}`} element={<User />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* <ErrorComponent /> */}
      <Footer />
    </>
  )
}

export default PageRoutes
