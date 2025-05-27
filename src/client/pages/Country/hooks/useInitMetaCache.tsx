import { useEffect } from 'react'

import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'

import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
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
      dispatch(MetaActions.getMetaCache({ assessmentName, cycleName, countryIso }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, metaCache])
}
