import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useCycle } from '@client/store/assessment'

import CycleLanding from '../CycleLanding'

const AssessmentLanding: React.FC = () => {
  const dispatch = useAppDispatch()
  const cycle = useCycle()

  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()

  useEffect(() => {
    dispatch(AssessmentActions.initApp({ assessmentName, cycleName }))

    return () => {
      dispatch(AssessmentActions.reset())
    }
  }, [assessmentName, cycleName, dispatch])

  if (!cycle) return null

  return (
    <Routes>
      <Route path={ClientRoutes.Assessment.CycleLanding.path.relative} element={<CycleLanding />} />

      <Route
        path="*"
        element={
          <Navigate
            to={ClientRoutes.Assessment.CycleLanding.getLink({ assessmentName, cycleName: cycle.name })}
            replace
          />
        }
      />
    </Routes>
  )
}

export default AssessmentLanding
