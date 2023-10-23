import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useOriginalDataPointRouteParams } from 'client/hooks/useRouteParams'

export const useGetOriginalDataPoint = () => {
  const dispatch = useAppDispatch()

  const { assessmentName, cycleName, countryIso, year } = useOriginalDataPointRouteParams()

  useEffect(() => {
    if (year !== '-1') {
      dispatch(
        OriginalDataPointActions.getOriginalDataPoint({
          year,
          assessmentName,
          countryIso: countryIso as CountryIso,
          cycleName,
        })
      )
    }
    return () => {
      dispatch(OriginalDataPointActions.reset())
    }
  }, [assessmentName, countryIso, cycleName, dispatch, year])
}
