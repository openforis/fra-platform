import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useIsAppInitialized } from 'client/store/assessment'
import Toaster from 'client/components/Toaster'
import Tooltips from 'client/components/Tooltips'
import { useRoutes } from 'client/pages/PageRoutes/hooks/useRoutes'

import { useInitApp } from './hooks/useInitApp'
import { useOpenSocket } from './hooks/useOpenSocket'

const PageRoutes: React.FC = () => {
  const routes = useRoutes()
  useInitApp()
  useOpenSocket()
  const isAppInitialized = useIsAppInitialized()

  if (!isAppInitialized) return null

  return (
    <>
      <Toaster />
      <RouterProvider router={createBrowserRouter(routes)} />

      {/* <Routes> */}
      {/*  <Route path="/" element={<Landing />} /> */}

      {/*  <Route path={`${ClientRoutes.Assessment.Landing.path.absolute}/*`} element={<Assessment />} /> */}

      {/*  <Route path="*" element={<Navigate to={ClientRoutes.Root.path} replace />} /> */}
      {/* </Routes> */}

      <Tooltips />
    </>
  )
}

export default PageRoutes
