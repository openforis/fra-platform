import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData/repository/item'

import { useAppDispatch } from 'client/store/hooks'
import { RepositoryActions } from 'client/store/repository/actions'

type Returned = () => void

const initialRepositoryItem = (countryIso?: CountryIso, parentUuid?: string): Partial<RepositoryItem> => {
  return { countryIso, parentUuid, props: { public: true, translation: { en: undefined } } }
}

export const useOpenPanel = (props: {
  repositoryItem?: RepositoryItem
  countryIso?: CountryIso
  parentUuid?: string
}): Returned => {
  const { countryIso, parentUuid, repositoryItem } = props
  const _repositoryItem = repositoryItem ?? initialRepositoryItem(countryIso, parentUuid)
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(RepositoryActions.setRepositoryItem(_repositoryItem))
  }, [_repositoryItem, dispatch])
}
