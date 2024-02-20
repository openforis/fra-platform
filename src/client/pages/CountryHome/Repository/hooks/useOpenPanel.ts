import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { RepositoryItem } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'

const initialRepositoryItem = (countryIso?: CountryIso): Partial<RepositoryItem> => ({
  countryIso,
  props: {
    translation: {
      en: undefined,
    },
  },
})

export const useOpenPanel = (props: { repositoryItem?: RepositoryItem; countryIso?: CountryIso }) => {
  const { repositoryItem, countryIso } = props
  const _repositoryItem = repositoryItem ?? initialRepositoryItem(countryIso)
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(RepositoryActions.setRepositoryItem(_repositoryItem)), [_repositoryItem, dispatch])
}
