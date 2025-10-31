import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData'

import { useAppDispatch } from 'client/store/hooks'
import { RepositoryActions } from 'client/store/repository/actions'

type Returned = () => void

const initialRepositoryItem = (countryIso?: CountryIso): Partial<RepositoryItem> => {
  return { countryIso, props: { translation: { en: undefined } } }
}

export const useOpenPanel = (props: { repositoryItem?: RepositoryItem; countryIso?: CountryIso }): Returned => {
  const { countryIso, repositoryItem } = props
  const _repositoryItem = repositoryItem ?? initialRepositoryItem(countryIso)
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(RepositoryActions.setRepositoryItem(_repositoryItem))
  }, [_repositoryItem, dispatch])
}
