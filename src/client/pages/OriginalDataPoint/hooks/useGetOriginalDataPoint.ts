import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useOriginalDataPointRouteParams } from 'client/hooks/useRouteParams'

export const useGetOriginalDataPoint = () => {
  const dispatch = useAppDispatch()

  const { assessmentName, countryIso, cycleName, year } = useOriginalDataPointRouteParams()

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
