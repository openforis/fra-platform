import React from 'react'

import Footer from './Footer'
import Header from './Header'
import Toolbar from './Toolbar'

type Props = {
  children: JSX.Element
  withHeader?: boolean
  withToolbar?: boolean
}

const PageLayout: React.FC<Props> = (props) => {
  const { children, withHeader, withToolbar } = props

  return (
    <>
      {withHeader && <Header />}
      {withToolbar && <Toolbar />}
      {children}
      <Footer />
    </>
  )
}

PageLayout.defaultProps = {
  withHeader: true,
  withToolbar: true,
}

export default PageLayout
