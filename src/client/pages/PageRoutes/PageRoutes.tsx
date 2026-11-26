import React from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { useIsAppInitialized } from 'client/store/application/hooks/init'
import Toaster from 'client/components/Toaster'
import Tooltips from 'client/components/Tooltips'

import { useInitApp } from './hooks/useInitApp'
import { useOpenSocket } from './hooks/useOpenSocket'
import { useReconnectSocket } from './hooks/useReconnectSocket'
import { useRoutes } from './hooks/useRoutes'

// AppInitialized builds a new router on every render, so useUser stays out of it
const ReconnectSocket: React.FC = () => {
  useReconnectSocket()
  return null
}

const AppInitialized: React.FC = () => {
  const routes = useRoutes()

  return (
    <>
      <Toaster />
      <RouterProvider router={createBrowserRouter(routes)} />
      <Tooltips />
      <ReconnectSocket />
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
