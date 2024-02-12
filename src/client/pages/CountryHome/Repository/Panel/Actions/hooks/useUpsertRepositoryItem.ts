import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { FileUploadActions } from 'client/store/ui/fileUpload'
import { RepositoryActions, useRepositoryItem } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Returned = () => void

export const useUpsertRepositoryItem = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const repositoryItem = useRepositoryItem()

  return useCallback<Returned>(async () => {
    const saveParams = { assessmentName, cycleName, countryIso, repositoryItem }
    dispatch(RepositoryActions.upsertRepositoryItem(saveParams))
      .unwrap()
      .then(() => {
        dispatch(FileUploadActions.reset())
        dispatch(RepositoryActions.setRepositoryItem(undefined))
      })
  }, [assessmentName, cycleName, countryIso, repositoryItem, dispatch])
}
