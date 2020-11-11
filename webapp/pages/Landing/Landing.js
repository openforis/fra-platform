import './landing.less'
import React from 'react'

import Partners from '@webapp/components/Partners'
import CountrySelection from '@webapp/components/countrySelection'

import Introduction from './Introduction'
import KeyFinidings from './KeyFinidings'
import PanEuropeanLinks from './PanEuropeanLinks'

const Landing = () => (
  <>
    <CountrySelection />
    <Introduction />
    <KeyFinidings />
    <Partners />
    <PanEuropeanLinks />
  </>
)

export default Landing
