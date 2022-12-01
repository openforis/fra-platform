import './landing.scss'
import React from 'react'

import { useSyncAssessmentPage } from '@client/store/assessment'
import CountrySelect from '@client/components/CountrySelect'
import Partners from '@client/components/Partners'

import Introduction from './Introduction'
import KeyFindings from './KeyFindings'

const Landing: React.FC = () => {
  useSyncAssessmentPage()

  return (
    <>
      <CountrySelect />
      <Introduction />
      <KeyFindings />
      <Partners />
    </>
  )
}

export default Landing
