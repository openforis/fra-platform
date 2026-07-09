import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { useCountry } from 'client/store/area/hooks/country'
import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useGetValidationsSummary = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEditData = useCanEditCycleData()
  const country = useCountry(countryIso)
  const dispatch = useAppDispatch()

  // Prop `useOriginalDataPoint` affects the summary, so we refetch it when the prop changes
  const forestCharacteristicsUseOriginalDataPoint = Boolean(country?.props?.forestCharacteristics?.useOriginalDataPoint)

  // Init validations summary
  useEffect(() => {
    if (!canEditData) return

    dispatch(ValidationsActions.getSummary({ assessmentName, cycleName, countryIso }))
  }, [assessmentName, canEditData, countryIso, cycleName, dispatch, forestCharacteristicsUseOriginalDataPoint])

  // Cleanup validations on unmount
  useEffect(() => {
    return (): void => {
      dispatch(ValidationsActions.removeValidations({ assessmentName, cycleName, countryIso }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch])
}
