import { useAppSelector } from 'client/store/store'
import { RepositorySelectors } from 'client/store/ui/repository/selectors'

export const useIsRepositoryLoading = () => {
  return useAppSelector(RepositorySelectors.isLoading)
}
