import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { useNationalDataPointValidationsFetched } from 'client/store/data/tableData/validations/hooks/nationalDataPoints'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'

import { useShouldFetchNationalDataPointData } from './useShouldFetchNationalDataPointData'

export const useGetNationalDataPointValidations = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()
  const fetched = useNationalDataPointValidationsFetched()
  const shouldFetch = useShouldFetchNationalDataPointData()

  useEffect(() => {
    if (!shouldFetch || fetched) return

    dispatch(ValidationsActions.getNationalDataPointValidations({ assessmentName, cycleName, countryIso, sectionName }))
  }, [assessmentName, countryIso, cycleName, dispatch, fetched, sectionName, shouldFetch])
}
