import { Objects } from 'utils/objects'

import { RepositoryItem } from 'meta/cycleData'

import { useAppSelector } from 'client/store/store'
import { RepositorySelectors } from 'client/store/ui/repository/selectors'

export const useIsRepositoryLoading = (): boolean => {
  return useAppSelector(RepositorySelectors.isLoading)
}

export const useRepositoryItem = (): Partial<RepositoryItem> | undefined => {
  return useAppSelector(RepositorySelectors.getRepositoryItem)
}

export const useRepositoryFile = (): Partial<RepositoryItem> | undefined => {
  return useAppSelector(RepositorySelectors.getRepositoryFile)
}

export const useRepositoryItemValidation = (): Record<string, string> | undefined => {
  return useAppSelector(RepositorySelectors.getRepositoryItemValidation)
}

export const useIsRepositoryItemValid = (): boolean => {
  const repositoryItemValidation = useRepositoryItemValidation()
  return Objects.isEmpty(repositoryItemValidation)
}

export const useRepositoryItemPropValidation = (name: string): string => {
  const repositoryItemValidation = useRepositoryItemValidation()
  return repositoryItemValidation?.[name] as string
}
