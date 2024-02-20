import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useIsAppInitialized } from 'client/store/assessment'
import Toaster from 'client/components/Toaster'
import Tooltips from 'client/components/Tooltips'

import { useInitApp } from './hooks/useInitApp'
import { useOpenSocket } from './hooks/useOpenSocket'
import { useRoutes } from './hooks/useRoutes'

const AppInitialized: React.FC = () => {
  const routes = useRoutes()

  return (
    <>
      <Toaster />
      <RouterProvider router={createBrowserRouter(routes)} />
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
