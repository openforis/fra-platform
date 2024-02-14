import { RepositoryItem } from 'meta/cycleData'

import { useAppSelector } from 'client/store/store'
import { RepositorySelectors } from 'client/store/ui/repository/selectors'

export const useIsRepositoryLoading = (): boolean => {
  return useAppSelector(RepositorySelectors.isLoading)
}

export const useRepositoryItem = (): Partial<RepositoryItem> | undefined => {
  return useAppSelector(RepositorySelectors.getRepositoryItem)
}

export const useRepositoryItems = (): Array<RepositoryItem> => {
  return useAppSelector(RepositorySelectors.getRepositoryItems)
}
