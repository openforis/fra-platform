import React from 'react'
import { Navigate, Outlet } from 'react-router'

import { Routes } from 'meta/routes/routes'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useIsAdminRoute, useIsLoginRoute, useIsPrintRoute } from 'client/hooks/routes'

import Footer from './Footer'
import Header from './Header'
import Toolbar from './Toolbar'

const PageLayout: React.FC = () => {
  const cycle = useCycle()
  const { print } = useIsPrintRoute()
  const isAdmin = useIsAdminRoute()
  const isLogin = useIsLoginRoute()

  // Redirect on invalid cycle
  if (!cycle) {
    return <Navigate replace to={Routes.Root.path.absolute} />
  }

  const withHeader = !print
  const withToolbar = !isAdmin && !isLogin

  return (
    <>
      {withHeader && <Header />}
      {withToolbar && <Toolbar />}

      <Outlet />
      <Footer />
    </>
  )
}

export default PageLayout
