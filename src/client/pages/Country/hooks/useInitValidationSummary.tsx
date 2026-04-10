import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useInitValidationSummary = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEditData = useCanEditCycleData()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!canEditData) return

    dispatch(ValidationsActions.getSummary({ assessmentName, cycleName, countryIso }))

    return (): void => {
      dispatch(ValidationsActions.removeValidations({ assessmentName, cycleName, countryIso }))
    }
  }, [assessmentName, canEditData, countryIso, cycleName, dispatch])
}
