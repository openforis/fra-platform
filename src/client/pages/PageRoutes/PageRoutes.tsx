import React, { useMemo } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { useIsAppInitialized } from 'client/store/application/hooks/init'
import Toaster from 'client/components/Toaster'
import Tooltips from 'client/components/Tooltips'

import { useInitApp } from './hooks/useInitApp'
import { useOpenSocket } from './hooks/useOpenSocket'
import { usePageEngagement } from './hooks/usePageEngagement'
import { useRoutes } from './hooks/useRoutes'

const AppInitialized: React.FC = () => {
  const routes = useRoutes()
  const router = useMemo(() => createBrowserRouter(routes), [routes])

  usePageEngagement(router)

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
      <Tooltips />
    </>
  )
}

const PageRoutes: React.FC = () => {
  useInitApp()
  useOpenSocket()
  const isAppInitialized = useIsAppInitialized()

  if (!isAppInitialized) return null

  return <AppInitialized />
}

export default PageRoutes
