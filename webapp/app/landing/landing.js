import React from 'react'

import CountrySelection from '@webapp/components/countrySelection'
import Partners from '@webapp/components/Partners'

import Introduction from './Introduction'
import KeyFinidings from './KeyFinidings'

const Landing = () => (
  <>
    <CountrySelection />
    <Introduction />
    <KeyFinidings />
    <Partners />
  </>
)

export default Landing
