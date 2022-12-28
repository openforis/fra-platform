import '@client/components/CountrySelect/countrySelect.scss'
import '@client/components/CountrySelect/CountryList/countryList.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'

import { useAppDispatch } from '@client/store'
import { AssessmentActions } from '@client/store/assessment'
import Footer from '@client/components/Footer'
import Toaster from '@client/components/Toaster'
import Admin from '@client/pages/Admin'
import Geo from '@client/pages/Geo'
import Login from '@client/pages/Login'
import User from '@client/pages/User'
import { SocketClient } from '@client/service/socket'
import { Urls } from '@client/utils'

import Assessment from '../Assessment'
import Landing from '../Landing'
import { useTheme } from './useTheme'

const PageRoutes: React.FC = () => {
  const dispatch = useAppDispatch()
  useTheme()
  const { i18n } = useTranslation()

  useEffect(() => {
    // TODO: Add user.language support
    const language = Urls.getRequestParam('lang') || localStorage.getItem('i18n/lang') || 'en'
    if (language !== i18n.language) i18n.changeLanguage(language)

    dispatch(AssessmentActions.initApp())

    SocketClient.open()

    return () => {
      SocketClient.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path={`${ClientRoutes.Assessment.Landing.path.absolute}/*`} element={<Assessment />} />
        <Route path={`${ClientRoutes.Admin.Root.path.absolute}/*`} element={<Admin />} />
        <Route path={`${ClientRoutes.Login.Root.path.absolute}/*`} element={<Login />} />
        <Route path={`${ClientRoutes.Geo.Root.path.absolute}/*`} element={<Geo />} />
        <Route path={ClientRoutes.Users.User.path.absolute} element={<User />} />

        <Route path="*" element={<Navigate to={ClientRoutes.Root.path} replace />} />
      </Routes>

      <Footer />
    </>
  )
}

export default PageRoutes
