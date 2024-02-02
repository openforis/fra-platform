import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useFileUploadContext } from 'client/components/FileUpload'

type Returned = () => void

export const useClosePanel = (): Returned => {
  const { setFiles } = useFileUploadContext()
  const dispatch = useAppDispatch()
  return useCallback<Returned>(() => {
    setFiles(null)
    dispatch(RepositoryActions.setRepositoryItem(undefined))
  }, [dispatch, setFiles])
}
