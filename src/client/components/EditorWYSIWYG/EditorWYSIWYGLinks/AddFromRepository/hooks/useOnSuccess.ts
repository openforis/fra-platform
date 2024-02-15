import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { RepositoryItem } from 'meta/cycleData'
import { File } from 'meta/file'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useOnSuccess = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  return useCallback(
    (files: Array<File>) => {
      files?.forEach((file) => {
        const props = { public: true }
        const repositoryItem: Partial<RepositoryItem> = { countryIso, fileUuid: file.uuid, name: file.name, props }
        const saveParams = { assessmentName, cycleName, countryIso, repositoryItem }
        dispatch(RepositoryActions.upsertRepositoryItem(saveParams))
          .unwrap()
          .then(() => {
            dispatch(RepositoryActions.getRepositoryItems({ assessmentName, cycleName, countryIso }))
          })
      })
    },
    [assessmentName, countryIso, cycleName, dispatch]
  )
}
