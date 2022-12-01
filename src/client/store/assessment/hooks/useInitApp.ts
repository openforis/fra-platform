import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'

import { useAppDispatch, useAppSelector } from '@client/store'
import { AssessmentActions, useAssessment, useAssessmentSections } from '@client/store/assessment'

export const useInitApp = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()
  const countries = useAppSelector((state) => state.assessment.countries)
  const assessmentSections = useAssessmentSections()

  const appReady = assessment && countries && assessmentSections

  useEffect(() => {
    if (!assessment?.props.name || assessment?.props.name !== assessmentName) {
      dispatch(AssessmentActions.initApp({ assessmentName }))
    }
  }, [assessment?.props.name, assessmentName, dispatch])

  useEffect(() => {
    dispatch(AssessmentActions.getAreas({ assessmentName, cycleName }))
  }, [assessmentName, cycleName, dispatch])

  return appReady
}
