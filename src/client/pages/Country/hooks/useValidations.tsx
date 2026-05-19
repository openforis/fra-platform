import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'

import { useDescriptionValidations } from './useDescriptionValidations'
import { useTableValidations } from './useTableValidations'

export const useValidations = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEditData = useCanEditCycleData()
  const dispatch = useAppDispatch()

  useTableValidations()
  useDescriptionValidations()

  // Init validations summary
  useEffect(() => {
    if (!canEditData) return

    dispatch(ValidationsActions.getSummary({ assessmentName, cycleName, countryIso }))
  }, [assessmentName, canEditData, countryIso, cycleName, dispatch])

  // Cleanup validations on unmount
  useEffect(() => {
    return (): void => {
      dispatch(ValidationsActions.removeValidations({ assessmentName, cycleName, countryIso }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch])
}
