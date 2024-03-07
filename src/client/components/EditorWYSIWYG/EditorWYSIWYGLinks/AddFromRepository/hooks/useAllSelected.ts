import { useMemo } from 'react'

import { useIsChecked } from './useIsChecked'
import { useRepositoryItems } from './useRepositoryItems'

export const useAllSelected = (): boolean => {
  const repositoryItems = useRepositoryItems()
  const isChecked = useIsChecked()

  return useMemo(
    () => repositoryItems.every((repositoryItem) => isChecked(repositoryItem.uuid)),
    [repositoryItems, isChecked]
  )
}
