import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'

import { useAppDispatch } from 'client/store'
import { AssessmentActions, useIsAppInitialized } from 'client/store/assessment'
import Toaster from 'client/components/Toaster'
import Tooltips from 'client/components/Tooltips'
import { SocketClient } from 'client/service/socket'
import { Urls } from 'client/utils'

import Assessment from '../Assessment'
import Landing from '../Landing'
import { useTheme } from './useTheme'
import { useUserRedirect } from './useUserRedirect'

const PageRoutes: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAppInitialized = useIsAppInitialized()

  useTheme()
  useUserRedirect()

  const { i18n } = useTranslation()

  useEffect(() => {
    // TODO: Add user.language support
    const language = Urls.getRequestParam('lang') || localStorage.getItem('i18n/lang') || 'en'
    if (language !== i18n.language) i18n.changeLanguage(language)

    dispatch(AssessmentActions.initApp())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isAppInitialized) {
      SocketClient.open()
      return () => {
        SocketClient.close()
      }
    }
    return undefined
  }, [isAppInitialized])

  if (!isAppInitialized) return null

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path={`${ClientRoutes.Assessment.Landing.path.absolute}/*`} element={<Assessment />} />

        <Route path="*" element={<Navigate to={ClientRoutes.Root.path} replace />} />
      </Routes>

      <Tooltips />
    </>
  )
}

export default PageRoutes
