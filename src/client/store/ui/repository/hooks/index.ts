import { useAppSelector } from 'client/store/store'

export const useIsRepositoryLoading = () => {
  return useAppSelector((state) => state.ui.repository.loading)
}
