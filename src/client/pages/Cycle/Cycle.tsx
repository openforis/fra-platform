import './Cycle.scss'
import React, { useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment, useCycle } from '@client/store/assessment'
import { useIsPrint } from '@client/hooks/useIsPath'
import CountrySelect from '@client/components/CountrySelect'
import Header from '@client/components/Header'
import Partners from '@client/components/Partners'

import Country from '../Country'
import Introduction from './Introduction'
import KeyFindings from './KeyFindings'

const Cycle: React.FC = () => {
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()
  const dispatch = useAppDispatch()
  const { print } = useIsPrint()
  const assessment = useAssessment()
  const cycle = useCycle()

  useEffect(() => {
    dispatch(AssessmentActions.getAreas({ assessmentName, cycleName }))
    // TODO: reset areas on return
  }, [assessmentName, cycleName, dispatch])

  if (!assessment || !cycle) return null

  return (
    <>
      {!print && <Header />}
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
        <Route path={`${ClientRoutes.Assessment.Cycle.Country.Landing.path.relative}/*`} element={<Country />} />
      </Routes>
    </>
  )
}

export default Cycle
