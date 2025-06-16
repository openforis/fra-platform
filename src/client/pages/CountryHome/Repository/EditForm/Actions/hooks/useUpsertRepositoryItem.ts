import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store/hooks'
import { RepositoryActions } from 'client/store/repository/actions'
import { useRepositoryItem } from 'client/store/repository/hooks/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Returned = () => void

export const useUpsertRepositoryItem = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const repositoryItem = useRepositoryItem()

  return useCallback<Returned>(async () => {
    const saveParams = { assessmentName, cycleName, countryIso, repositoryItem }
    dispatch(RepositoryActions.upsertRepositoryItem(saveParams))
      .unwrap()
      .then(() => {
        dispatch(RepositoryActions.reset())
      })
  }, [assessmentName, countryIso, cycleName, dispatch, repositoryItem])
}
