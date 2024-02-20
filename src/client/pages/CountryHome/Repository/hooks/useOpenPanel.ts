import { useCallback } from 'react'

import { RepositoryItem } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'

const initialRepositoryItem: Partial<RepositoryItem> = {
  props: {
    translation: {
      en: undefined,
    },
  },
}

export const useOpenPanel = (repositoryItem?: RepositoryItem) => {
  const _repositoryItem = repositoryItem ?? initialRepositoryItem
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(RepositoryActions.setRepositoryItem(_repositoryItem)), [_repositoryItem, dispatch])
}
