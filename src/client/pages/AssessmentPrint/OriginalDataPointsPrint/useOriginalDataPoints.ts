import { useEffect, useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { OriginalDataPoint } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso, useGetRequest } from 'client/hooks'

export const useOriginalDataPoints = (): { originalDataPoints: Array<OriginalDataPoint>; loading: boolean } => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  const {
    data = [],
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
    // eslint-disable-next-line
  }, [])

  const originalDataPoints = useMemo(
    () => data.sort((a: OriginalDataPoint, b: OriginalDataPoint) => a.year - b.year),
    [data]
  )

  return {
    originalDataPoints,
    loading,
  }
}
