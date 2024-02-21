import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { RepositoryActions, useRepositoryItem } from 'client/store/ui/repository'
import { useRepositoryFile as useRepositoryItemFile } from 'client/store/ui/repository/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useGetFileMetadata = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const repositoryItem = useRepositoryItem()
  const selectedFile = useRepositoryItemFile()
  useEffect(() => {
    const fileUuid = repositoryItem?.fileUuid
    const uuid = repositoryItem?.uuid
    const isDifferentFile = repositoryItem?.fileUuid !== selectedFile?.fileUuid
    if (uuid && fileUuid && isDifferentFile)
      dispatch(RepositoryActions.getFileMetadata({ fileUuid, uuid, assessmentName, cycleName, countryIso }))
  }, [
    assessmentName,
    countryIso,
    cycleName,
    dispatch,
    repositoryItem?.fileUuid,
    repositoryItem?.uuid,
    selectedFile?.fileUuid,
  ])
}
