/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment } from '@client/store/assessment'

import CycleLanding from '../CycleLanding'

const AssessmentLanding: React.FC = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()

  const { assessmentName } = useParams<{ assessmentName: AssessmentName }>()

  useEffect(() => {
    if (!assessment || assessment.props.name !== assessmentName)
      dispatch(AssessmentActions.getAssessment({ assessmentName }))

    return () => {
      dispatch(AssessmentActions.reset())
    }
  }, [assessmentName, dispatch])

  if (!assessment) return null

  return (
    <Routes>
      <Route path={`${ClientRoutes.Assessment.CycleLanding.path.relative}/*`} element={<CycleLanding />} />
    </Routes>
  )
}

export default AssessmentLanding
