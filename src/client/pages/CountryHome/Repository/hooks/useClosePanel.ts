import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useSelectedFileContext } from 'client/context/selectedFilesContext'

type Returned = () => void

export const useClosePanel = (): Returned => {
  const { setSelectedFiles } = useSelectedFileContext()
  const dispatch = useAppDispatch()
  return useCallback<Returned>(() => {
    setSelectedFiles(null)
    dispatch(RepositoryActions.setRepositoryItem(undefined))
  }, [dispatch, setSelectedFiles])
}
