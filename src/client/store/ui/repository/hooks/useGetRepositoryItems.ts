import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useGetRepositoryItems = (): void => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(RepositoryActions.getRepositoryItems({ assessmentName, cycleName, countryIso }))
  }, [countryIso, dispatch, assessmentName, cycleName])
}
