import './landing.scss'
import React from 'react'

import CountrySelect from '@client/components/CountrySelect'
import Partners from '@client/components/Partners'

import Introduction from './Introduction'
import KeyFindings from './KeyFindings'

const Landing: React.FC = () => (
  <>
    <CountrySelect />
    <Introduction />
    <KeyFindings />
    <Partners />
  </>
)

export default Landing
