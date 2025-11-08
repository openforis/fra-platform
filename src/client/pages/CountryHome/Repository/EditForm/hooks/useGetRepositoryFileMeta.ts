import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData'

import { useAppDispatch } from 'client/store/hooks'
import { RepositoryActions } from 'client/store/repository/actions'
import { useRepositoryFileMeta, useRepositoryItem } from 'client/store/repository/hooks/repository'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useGetRepositoryFileMeta = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

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
