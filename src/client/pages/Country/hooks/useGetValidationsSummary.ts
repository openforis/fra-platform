import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { useCountry } from 'client/store/area/hooks/country'
import { useHasOriginalDataPointData } from 'client/store/data/tableData/nodeValues/hooks/originalDataPointData'
import { ValidationActions } from 'client/store/data/validations/actions'
import { SummaryValidationActions } from 'client/store/data/validations/summary/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useGetValidationsSummary = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEditData = useCanEditCycleData()
  const country = useCountry(countryIso)
  const dispatch = useAppDispatch()

  // The summary depends on prop `useOriginalDataPoint` and on whether the country has NDP data, so we refetch it when they change
  const forestCharacteristicsUseOriginalDataPoint = Boolean(country?.props?.forestCharacteristics?.useOriginalDataPoint)
  const hasNationalDataPointData = useHasOriginalDataPointData()

  // Init validations summary
  useEffect(() => {
    if (!canEditData) return

    dispatch(SummaryValidationActions.getSummary({ assessmentName, cycleName, countryIso }))
  }, [
    assessmentName,
    canEditData,
    countryIso,
    cycleName,
    dispatch,
    forestCharacteristicsUseOriginalDataPoint,
    hasNationalDataPointData,
  ])

  // Cleanup validations on unmount
  useEffect(() => {
    return (): void => {
      dispatch(ValidationActions.removeValidations({ assessmentName, cycleName, countryIso }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch])
}
