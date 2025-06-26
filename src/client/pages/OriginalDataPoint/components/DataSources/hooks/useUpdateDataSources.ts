import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useUpdateDataSources = () => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()

  const dispatch = useAppDispatch()
  return useCallback(
    (originalDataPoint: OriginalDataPoint) => {
      dispatch(
        OriginalDataPointActions.updateOriginalDataPointDataSources({
          countryIso: countryIso as CountryIso,
          cycleName,
          assessmentName,
          originalDataPoint,
        })
      )
    },
    [assessmentName, countryIso, cycleName, dispatch]
  )
}
