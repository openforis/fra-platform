import './landing.scss'
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment } from '@client/store/assessment'

const Landing: React.FC = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()

  useEffect(() => {
    dispatch(AssessmentActions.getAssessment())
  }, [dispatch])

  if (!assessment) return null

  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to={ClientRoutes.Assessments.getLink({ assessmentName: assessment.props.name })} replace />}
      />
    </Routes>
  )
}

export default Landing
