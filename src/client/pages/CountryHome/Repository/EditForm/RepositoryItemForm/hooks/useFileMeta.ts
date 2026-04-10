import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { FileMeta } from 'meta/file/meta'

import { useAppDispatch } from 'client/store/hooks'
import { RepositoryActions } from 'client/store/repository/actions'
import { useRepositoryFileMeta } from 'client/store/repository/hooks/repository'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useFileMeta = (repositoryItem: Partial<RepositoryItem> | undefined): FileMeta | undefined => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const fileMeta = useRepositoryFileMeta()

  const { fileUuid, uuid } = repositoryItem ?? {}
  const summaryFileUuid = fileMeta?.summary?.uuid

  useEffect(() => {
    if (fileUuid && uuid && fileUuid !== summaryFileUuid) {
      dispatch(
        RepositoryActions.getFileMeta({
          repositoryItem: repositoryItem as RepositoryItem,
          assessmentName,
          cycleName,
          countryIso,
        })
      )
    }
  }, [assessmentName, countryIso, cycleName, dispatch, fileUuid, repositoryItem, summaryFileUuid, uuid])

  return fileMeta
}
