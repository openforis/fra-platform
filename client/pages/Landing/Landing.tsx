import './landing.scss'
import React from 'react'

import Partners from 'client/components/Partners'

import Introduction from './Introduction'
import KeyFindings from './KeyFindings'

const Landing: React.FC = () => (
  <>
    <Introduction />
    <KeyFindings />
    <Partners />
  </>
)

export default Landing
