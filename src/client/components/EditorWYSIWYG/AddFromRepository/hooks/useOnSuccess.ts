import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { RepositoryItem } from 'meta/cycleData'
import { File } from 'meta/file'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useGetRepositoryItems } from './useGetRepositoryItems'

export const useOnSuccess = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const getRepositoryItems = useGetRepositoryItems()

  return useCallback(
    (files: Array<File>) => {
      files?.forEach((file) => {
        const props = { public: true, translation: { en: file.name } }
        const repositoryItem: Partial<RepositoryItem> = { countryIso, fileUuid: file.uuid, props }
        const saveParams = { assessmentName, cycleName, countryIso, repositoryItem }
        dispatch(RepositoryActions.upsertRepositoryItem(saveParams))
          .unwrap()
          .then(() => {
            getRepositoryItems()
          })
      })
    },
    [assessmentName, cycleName, countryIso, dispatch, getRepositoryItems]
  )
}
