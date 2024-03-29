import { Objects } from 'utils/objects'

import { RepositoryItem } from 'meta/cycleData'
import { FileMeta } from 'meta/file'

import { useAppSelector } from 'client/store/store'
import { RepositorySelectors } from 'client/store/ui/repository/selectors'

export const useIsRepositoryLoading = (): boolean => {
  return useAppSelector(RepositorySelectors.isLoading)
}

export const useRepositoryItem = (): Partial<RepositoryItem> | undefined => {
  return useAppSelector(RepositorySelectors.getRepositoryItem)
}

export const useRepositoryFileMeta = (): FileMeta | undefined => {
  return useAppSelector(RepositorySelectors.getRepositoryFileMeta)
}

export const useIsFileInUse = (): boolean => {
  const fileMeta = useRepositoryFileMeta()
  return !Objects.isEmpty(fileMeta?.usages)
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
