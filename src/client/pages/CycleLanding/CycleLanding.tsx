import './CycleLanding.scss'
import React, { useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment, useCycle } from '@client/store/assessment'
import CountrySelect from '@client/components/CountrySelect'
import Partners from '@client/components/Partners'

import Assessment from '../Assessment'
import Introduction from './Introduction'
import KeyFindings from './KeyFindings'

const CycleLanding: React.FC = () => {
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()

  useEffect(() => {
    dispatch(AssessmentActions.getAreas({ assessmentName, cycleName }))
    // TODO: reset areas on return
  }, [assessmentName, cycleName, dispatch])

  if (!assessment || !cycle) return null

  return (
    <>
      <CountrySelect />
      <Routes>
        <Route
          path=""
          element={
            <>
              <Introduction />
              <KeyFindings />
              <Partners />
            </>
          }
        />
        <Route path={`${ClientRoutes.Assessment.Root.path.relative}/*`} element={<Assessment />} />
      </Routes>
    </>
  )
}

export default CycleLanding
