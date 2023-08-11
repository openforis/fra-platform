import { useEffect } from 'react'

import { AssessmentMetaCaches } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { AssessmentActions, useAssessment, useCycle } from 'client/store/assessment'

export const useInitMetaCache = (): void => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const metaCache = AssessmentMetaCaches.getMetaCache({ assessment, cycle })

  useEffect(() => {
    if (!metaCache) {
      dispatch(AssessmentActions.getMetaCache({ assessmentName, cycleName }))
    }
  }, [assessmentName, cycleName, dispatch, metaCache])
}
