import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useIsAppInitialized } from 'client/store/assessment'
import Toaster from 'client/components/Toaster'
import Tooltips from 'client/components/Tooltips'

import { useInitApp } from './hooks/useInitApp'
import { useOpenSocket } from './hooks/useOpenSocket'
import { useRoutes } from './hooks/useRoutes'

const PageRoutes: React.FC = () => {
  useInitApp()
  useOpenSocket()
  const isAppInitialized = useIsAppInitialized()
  const routes = useRoutes()

  if (!isAppInitialized) return null

  return (
    <>
      <Toaster />
      <RouterProvider router={createBrowserRouter(routes)} />
      <Tooltips />
    </>
  )
}

export default PageRoutes
