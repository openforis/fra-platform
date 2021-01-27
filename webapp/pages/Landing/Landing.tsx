import './landing.less'
import React from 'react'

import Partners from '@webapp/components/Partners'

import Introduction from './Introduction'
import KeyFinidings from './KeyFinidings'
// import PanEuropeanLinks from './PanEuropeanLinks'

const Landing = () => (
  <>
    <Introduction />
    <KeyFinidings />
    <Partners />
    {/* <PanEuropeanLinks /> */}
  </>
)

export default Landing
