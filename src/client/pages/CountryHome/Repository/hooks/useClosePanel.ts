import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'

export const useClosePanel = () => {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(RepositoryActions.setRepositoryItem(undefined)), [dispatch])
}
