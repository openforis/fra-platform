import { useCallback } from 'react'

import { useAppDispatch } from 'client/store/hooks'
import { RepositoryActions } from 'client/store/repository/actions'

type Returned = () => void

export const useClosePanel = (): Returned => {
  const dispatch = useAppDispatch()
  return useCallback<Returned>(() => {
    dispatch(RepositoryActions.reset())
  }, [dispatch])
}
