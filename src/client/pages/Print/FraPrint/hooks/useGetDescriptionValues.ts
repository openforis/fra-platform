import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useGetDescriptionValues = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso: _countryIso } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso

  useEffect(() => {
    dispatch(DataActions.getDescription({ countryIso, assessmentName, cycleName }))
  }, [assessmentName, countryIso, cycleName, dispatch])
}
