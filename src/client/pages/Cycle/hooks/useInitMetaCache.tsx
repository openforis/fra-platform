import { useEffect } from 'react'

import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'

import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useInitMetaCache = (): void => {
  const dispatch = useAppDispatch()
  const { countryIso } = useCountryRouteParams()
  const assessment = useAssessment()
  const cycle = useCycle()

  const assessmentName = assessment.props.name
  const cycleName = cycle?.name
  // cycle not loaded or invalid
  const metaCache = cycle ? AssessmentMetaCaches.getMetaCache({ assessment, cycle }) : undefined

  useEffect(() => {
    if (cycle && !metaCache) {
      dispatch(MetaActions.getMetaCache({ assessmentName, cycleName }))
    }
  }, [assessmentName, countryIso, cycle, cycleName, dispatch, metaCache])
}
