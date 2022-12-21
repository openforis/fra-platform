import './CycleLanding.scss'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment } from '@client/store/assessment'
import CountrySelect from '@client/components/CountrySelect'
import Partners from '@client/components/Partners'

import Introduction from './Introduction'
import KeyFindings from './KeyFindings'

const CycleLanding: React.FC = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()

  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()

  useEffect(() => {
    dispatch(AssessmentActions.getAreas({ assessmentName, cycleName }))
    dispatch(AssessmentActions.getSections({ assessmentName, cycleName }))
  }, [assessmentName, cycleName, dispatch])

  if (!assessment) return null

  return (
    <>
      <CountrySelect />
      <Introduction />
      <KeyFindings />
      <Partners />
    </>
  )
}

export default CycleLanding
