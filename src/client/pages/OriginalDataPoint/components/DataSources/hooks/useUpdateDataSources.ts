import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { OriginalDataPoint } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useUpdateDataSources = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  const dispatch = useAppDispatch()
  return useCallback(
    (originalDataPointUpdate: OriginalDataPoint) => {
      dispatch(
        OriginalDataPointActions.updateOriginalDataPointDataSources({
          countryIso: countryIso as CountryIso,
          cycleName,
          assessmentName,
          originalDataPoint: originalDataPointUpdate,
        })
      )
    },
    [dispatch, countryIso, cycleName, assessmentName]
  )
}
