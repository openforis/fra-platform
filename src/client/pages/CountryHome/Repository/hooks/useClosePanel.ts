import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'

type Returned = () => void

export const useClosePanel = (): Returned => {
  const dispatch = useAppDispatch()
  return useCallback<Returned>(() => {
    dispatch(RepositoryActions.setRepositoryItem(undefined))
  }, [dispatch])
}
