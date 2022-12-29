import React from 'react'

import CountrySelect from '../CountrySelect'
import Footer from './Footer'
import Header from './Header'

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
      {withToolbar && <CountrySelect />}
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
