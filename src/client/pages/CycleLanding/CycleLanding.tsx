import './CycleLanding.scss'
import React, { useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import CountrySelect from '@client/components/CountrySelect'
import Partners from '@client/components/Partners'

import Assessment from '../Assessment'
import Introduction from './Introduction'
import KeyFindings from './KeyFindings'

const CycleLanding: React.FC = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()

  useEffect(() => {
    dispatch(AssessmentActions.getAreas({ assessmentName, cycleName }))
  }, [assessmentName, cycleName, dispatch])

  if (!assessment || !cycle) return null

  if (!countryIso) {
    return (
      <>
        <CountrySelect />
        <Introduction />
        <KeyFindings />
        <Partners />
      </>
    )
  }

  return (
    <Routes>
      <Route path={`${ClientRoutes.Assessment.Root.path.relative}/*`} element={<Assessment />} />
    </Routes>
  )
}

export default CycleLanding
