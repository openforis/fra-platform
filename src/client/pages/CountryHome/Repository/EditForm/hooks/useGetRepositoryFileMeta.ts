import { useEffect } from 'react'

import { CountryIso } from 'meta/area'
import { RepositoryItem } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { RepositoryActions, useRepositoryFileMeta, useRepositoryItem } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useGetRepositoryFileMeta = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const dispatch = useAppDispatch()
  const repositoryItem = useRepositoryItem() as RepositoryItem
  const fileMeta = useRepositoryFileMeta()

  const { fileUuid, uuid } = repositoryItem ?? {}
  const summaryFileUuid = fileMeta?.summary?.uuid

  useEffect(() => {
    if (fileUuid && uuid && fileUuid !== summaryFileUuid) {
      dispatch(RepositoryActions.getFileMeta({ repositoryItem, assessmentName, cycleName, countryIso }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, fileUuid, repositoryItem, summaryFileUuid, uuid])
}
