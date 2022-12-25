import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment, useCycle } from '@client/store/assessment'

const Landing: React.FC = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()

  useEffect(() => {
    dispatch(AssessmentActions.getAssessment())
  }, [dispatch])

  if (!assessment || !cycle) return null

  return (
    <Navigate
      to={ClientRoutes.Assessment.CycleLanding.getLink({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
      })}
      replace
    />
  )
}

export default Landing
