import { useMemo } from 'react'

import { useRepositoryItems } from 'client/store/ui/repository'

import { useIsChecked } from './useIsChecked'

export const useAllSelected = (): boolean => {
  const repositoryItems = useRepositoryItems()
  const isChecked = useIsChecked()

  return useMemo(
    () => repositoryItems.every((repositoryItem) => isChecked(repositoryItem.uuid)),
    [repositoryItems, isChecked]
  )
}
