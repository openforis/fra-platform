import { useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { OriginalDataPoint } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso, useGetRequest } from 'client/hooks'

export const useOriginalDataPoints = (): { originalDataPoints: Array<OriginalDataPoint>; loading: boolean } => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  const {
    data: originalDataPoints = [],
    dispatch: fetchResults,
    loading,
  } = useGetRequest(ApiEndPoint.CycleData.OriginalDataPoint.many(), {
    params: {
      countryIso,
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
    },
  })

  useEffect(() => {
    fetchResults()
  }, [])

  return { originalDataPoints, loading }
}
