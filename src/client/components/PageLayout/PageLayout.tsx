import React from 'react'
import { Outlet } from 'react-router-dom'

import { useIsAdminRoute, useIsLoginRoute, useIsPrintRoute } from 'client/hooks/useIsRoute'

import Footer from './Footer'
import Header from './Header'
import Toolbar from './Toolbar'

const PageLayout: React.FC = () => {
  const { print } = useIsPrintRoute()
  const isAdmin = useIsAdminRoute()
  const isLogin = useIsLoginRoute()

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

PageLayout.defaultProps = {
  withHeader: true,
  withToolbar: true,
}

export default PageLayout
