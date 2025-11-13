import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { File } from 'meta/file/file'

import { useAppDispatch } from 'client/store/hooks'
import { RepositoryActions } from 'client/store/repository/actions'
import { useCountryRouteParams } from 'client/hooks/routeParams'

import { useGetRepositoryItems } from './useGetRepositoryItems'

type Returned = (files: Array<File>) => void

export const useOnSuccess = (): Returned => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
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
    [assessmentName, countryIso, cycleName, dispatch, getRepositoryItems]
  )
}
