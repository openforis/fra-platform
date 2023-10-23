import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useReservedYears = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  useEffect(() => {
    dispatch(
      OriginalDataPointActions.getOriginalDataPointReservedYears({
        countryIso: countryIso as CountryIso,
        assessmentName,
        cycleName,
      })
    )
  }, [assessmentName, countryIso, cycleName, dispatch])
}
