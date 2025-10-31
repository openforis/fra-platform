import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useGetDescriptionValues = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso: _countryIso, cycleName } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso

  useEffect(() => {
    dispatch(DescriptionsActions.getDescription({ countryIso, assessmentName, cycleName }))
  }, [assessmentName, countryIso, cycleName, dispatch])
}
