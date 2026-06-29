import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { OriginalDataPointSlice } from 'client/store/data/originalDataPoint/slice'
import { injectDataSlice } from 'client/store/data/reducer'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'

import { useShouldFetchNationalDataPointData } from './useShouldFetchNationalDataPointData'

export const useGetOriginalDataPointReservedYears = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useSectionRouteParams<CountryIso>()
  const shouldFetch = useShouldFetchNationalDataPointData()

  useEffect(() => {
    if (!shouldFetch) return
    // reservedYears live in the lazy-loaded originalDataPoint slice, which is only injected on the NDP page,
    // but we need it here to display header errors.
    injectDataSlice(OriginalDataPointSlice)
    dispatch(OriginalDataPointActions.getOriginalDataPointReservedYears({ assessmentName, cycleName, countryIso }))
  }, [assessmentName, countryIso, cycleName, dispatch, shouldFetch])
}
