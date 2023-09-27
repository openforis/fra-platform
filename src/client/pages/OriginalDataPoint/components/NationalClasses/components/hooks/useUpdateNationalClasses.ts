import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { OriginalDataPoint } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useUpdateNationalClasses = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  const dispatch = useAppDispatch()
  return useCallback(
    (originalDataPoint: OriginalDataPoint) => {
      dispatch(
        OriginalDataPointActions.updateOriginalDataPointNationalClasses({
          countryIso: countryIso as CountryIso,
          cycleName,
          assessmentName,
          originalDataPoint,
        })
      )
    },
    [dispatch, countryIso, cycleName, assessmentName]
  )
}
