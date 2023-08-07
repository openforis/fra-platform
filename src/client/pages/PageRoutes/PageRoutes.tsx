import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'

import { useIsAppInitialized } from 'client/store/assessment'
import Toaster from 'client/components/Toaster'
import Tooltips from 'client/components/Tooltips'
import Assessment from 'client/pages/Assessment'
import Landing from 'client/pages/Landing'

import { useInitApp } from './hooks/useInitApp'
import { useInitLanguage } from './hooks/useInitLanguage'
import { useOpenSocket } from './hooks/useOpenSocket'
import { useTheme } from './hooks/useTheme'
import { useUserRedirect } from './hooks/useUserRedirect'

const PageRoutes: React.FC = () => {
  const isAppInitialized = useIsAppInitialized()

  useInitApp()
  useInitLanguage()
  useTheme()
  useOpenSocket()
  useUserRedirect()

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
