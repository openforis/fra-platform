import './landing.less'
import React from 'react'

import Partners from '@webapp/components/Partners'
import Introduction from './Introduction'
import KeyFinidings from './KeyFinidings'

const Landing = () => {
  return (
    <div className="home">
      <Introduction />
      <KeyFinidings />
      <Partners />
    </div>
  )
}

export default Landing
