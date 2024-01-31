import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useRepositoryItem } from 'client/store/ui/repository/hooks'

type Returned = (name: string, value: string) => void

export const useOnChange = (): Returned => {
  const dispatch = useAppDispatch()
  const repositoryItem = useRepositoryItem()

  return useCallback<Returned>(
    (name: string, value: string) => {
      dispatch(RepositoryActions.setRepositoryItem({ ...repositoryItem, [name]: value }))
    },
    [dispatch, repositoryItem]
  )
}
