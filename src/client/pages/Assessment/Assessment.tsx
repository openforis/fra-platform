import React, { useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { AssessmentName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { AssessmentActions, useAssessment } from 'client/store/assessment'
import { useOnUpdate } from 'client/hooks'

import Cycle from '../Cycle'
import Tutorials from '../Tutorials'

const Assessment: React.FC = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()

  const { assessmentName } = useParams<{ assessmentName: AssessmentName }>()

  useEffect(() => {
    if (!assessment) {
      dispatch(AssessmentActions.getAssessment({ assessmentName }))
    }
  }, [assessment, assessmentName, dispatch])

  useOnUpdate(() => {
    if (assessment && assessment.props.name !== assessmentName) {
      dispatch(AssessmentActions.getAssessment({ assessmentName }))

      return () => {
        dispatch(AssessmentActions.reset())
      }
    }
    return undefined
  }, [assessment, assessmentName, dispatch])

  if (!assessment) return null

  return (
    <Routes>
      <Route path={`${ClientRoutes.Assessment.Tutorials.path.relative}`} element={<Tutorials />} />

      <Route path={`${ClientRoutes.Assessment.Cycle.Landing.path.relative}/*`} element={<Cycle />} />
    </Routes>
  )
}

export default Assessment
