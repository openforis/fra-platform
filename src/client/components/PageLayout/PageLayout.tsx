import React from 'react'
import { Outlet } from 'react-router-dom'

import { useIsAdmin, useIsLogin, useIsPrint, useIsUserEditPage } from 'client/hooks/useIsPath'

import Footer from './Footer'
import Header from './Header'
import Toolbar from './Toolbar'

const PageLayout: React.FC = () => {
  const { print } = useIsPrint()
  const isAdmin = useIsAdmin()
  const isLogin = useIsLogin()

  const isUserEditPage = useIsUserEditPage()

  const withHeader = !print
  const withToolbar = !isAdmin && !isLogin && !isUserEditPage

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
