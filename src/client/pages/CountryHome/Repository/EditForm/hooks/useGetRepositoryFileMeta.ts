import { useEffect } from 'react'

import { CountryIso } from 'meta/area'
import { RepositoryItem } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { RepositoryActions, useRepositoryItem } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useGetRepositoryFileMeta = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const repositoryItem = useRepositoryItem() as RepositoryItem
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (repositoryItem?.fileUuid && repositoryItem?.uuid) {
      dispatch(RepositoryActions.getFileMeta({ repositoryItem, assessmentName, cycleName, countryIso }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, repositoryItem])
}
