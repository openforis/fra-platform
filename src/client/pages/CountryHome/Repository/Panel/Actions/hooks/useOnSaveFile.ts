import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Returned = () => Promise<void>

export const useOnSaveFile = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback<Returned>(async () => {
    const saveParams = { assessmentName, cycleName, countryIso }
    dispatch(RepositoryActions.createRepositoryItem(saveParams))
  }, [assessmentName, cycleName, countryIso, dispatch])
}
