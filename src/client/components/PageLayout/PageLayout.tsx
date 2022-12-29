import React from 'react'

import Footer from './Footer'

type Props = {
  children: JSX.Element
  withToolbar?: boolean
}

const PageLayout: React.FC<Props> = (props) => {
  const { children, withToolbar } = props

  return (
    <>
      {children}

      <Footer />
    </>
  )
}

PageLayout.defaultProps = {
  withToolbar: false,
}

export default PageLayout
