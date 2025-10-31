import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Returned = (value: string) => void

export const useUpdateDescription = (): Returned => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
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
    [assessmentName, countryIso, cycleName, dispatch, originalDataPoint]
  )
}
