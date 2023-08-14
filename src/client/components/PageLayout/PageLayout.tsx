import React from 'react'
import { Outlet } from 'react-router-dom'

import { useRedirect } from 'client/components/PageLayout/hooks/useRedirect'

import Footer from './Footer'
import Header from './Header'
import Toolbar from './Toolbar'

type Props = {
  withHeader?: boolean
  withToolbar?: boolean
}

const PageLayout: React.FC<Props> = (props) => {
  const { withHeader, withToolbar } = props
  useRedirect()

  return (
    <>
      {withHeader && <Header />}
      {withToolbar && <Toolbar />}
      {/* {children} */}

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
