import './landing.scss'
import React from 'react'

import Partners from '@webapp/components/Partners'

import Introduction from './Introduction'
import KeyFinidings from './KeyFinidings'

const Landing = () => (
  <>
    <Introduction />
    <KeyFinidings />
    <Partners />
  </>
)

export default Landing
