import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions, useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useUpdateDescription = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  return useCallback(
    (value: string) => {
      dispatch(
        OriginalDataPointActions.updateOriginalDataPointDescription({
          countryIso: countryIso as CountryIso,
          cycleName,
          assessmentName,
          originalDataPoint: {
            ...originalDataPoint,
            description: value,
          },
        })
      )
    },
    [dispatch, countryIso, cycleName, assessmentName, originalDataPoint]
  )
}
