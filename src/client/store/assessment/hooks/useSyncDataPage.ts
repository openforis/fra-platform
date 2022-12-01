import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'

import { useAppDispatch, useAppSelector } from '@client/store'
import { AssessmentActions, useAssessment, useAssessmentSections } from '@client/store/assessment'

export const useSyncDataPage = (): boolean => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()
  const countries = useAppSelector((state) => state.assessment.countries)
  const assessmentSections = useAssessmentSections()

  const appReady = Boolean(assessment && countries && assessmentSections)

  useEffect(() => {
    dispatch(AssessmentActions.initApp({ assessmentName }))
  }, [assessmentName, dispatch])

  useEffect(() => {
    dispatch(AssessmentActions.getAreas({ assessmentName, cycleName }))
  }, [assessmentName, cycleName, dispatch])

  return appReady
}
