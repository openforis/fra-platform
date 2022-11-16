import './landing.scss'
import React, { useEffect } from 'react'

import { useAppDispatch } from '@client/store'
import { AssessmentActions } from '@client/store/assessment'
import CountrySelect from '@client/components/CountrySelect'
import Partners from '@client/components/Partners'

import Introduction from './Introduction'
import KeyFindings from './KeyFindings'

const Landing: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(AssessmentActions.getCountries())
  }, [dispatch])

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
