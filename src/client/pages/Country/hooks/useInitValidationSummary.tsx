import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useInitValidationSummary = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(ValidationsActions.getSummary({ assessmentName, cycleName, countryIso }))
  }, [assessmentName, countryIso, cycleName, dispatch])
}
