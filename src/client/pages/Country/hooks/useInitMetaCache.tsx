import { useEffect } from 'react'

import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'

import { AssessmentActions, useAssessment, useCycle } from 'client/store/assessment'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useInitMetaCache = (): void => {
  const dispatch = useAppDispatch()
  const { countryIso } = useCountryRouteParams()
  const assessment = useAssessment()
  const cycle = useCycle()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const metaCache = AssessmentMetaCaches.getMetaCache({ assessment, cycle })

  useEffect(() => {
    if (!metaCache) {
      dispatch(AssessmentActions.getMetaCache({ assessmentName, cycleName, countryIso }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, metaCache])
}
