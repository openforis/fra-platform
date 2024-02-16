import { useAppSelector } from 'client/store/store'
import { RepositorySelectors } from 'client/store/ui/repository/selectors'

export const useIsRepositoryLoading = () => {
  return useAppSelector(RepositorySelectors.isLoading)
}

export const useRepositoryItem = () => {
  return useAppSelector(RepositorySelectors.getRepositoryItem)
}

export const useRepositoryItemValidation = (): Record<string, string> | undefined => {
  return useAppSelector(RepositorySelectors.getRepositoryItemValidation)
}

export const useRepositoryItemPropValidation = (name: string): string => {
  const repositoryItemValidation = useRepositoryItemValidation()
  return repositoryItemValidation?.[name] as string
}
