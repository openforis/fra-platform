import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { RepositoryActions, useRepositoryItem } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useFileUploadContext } from 'client/components/FileUpload'

type Returned = () => void

export const useUpsertRepositoryItem = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const { files, setFiles } = useFileUploadContext()
  const repositoryItem = useRepositoryItem()

  return useCallback<Returned>(async () => {
    const saveParams = { assessmentName, cycleName, countryIso, repositoryItem, file: files?.[0] }
    dispatch(RepositoryActions.upsertRepositoryItem(saveParams))
      .unwrap()
      .then(() => {
        setFiles(null)
      })
  }, [assessmentName, cycleName, countryIso, repositoryItem, files, dispatch, setFiles])
}
