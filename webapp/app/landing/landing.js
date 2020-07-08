import './landing.less'
import React from 'react'

import Partners from '@webapp/components/Partners'
import Introduction from './Introduction'

const Landing = () => {
  return (
    <div className="home">
      <Introduction />
      <Partners />
    </div>
  )
}

export default Landing
