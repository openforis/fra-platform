import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { FileUploadActions } from 'client/store/ui/fileUpload'
import { RepositoryActions } from 'client/store/ui/repository'

type Returned = () => void

export const useOnRemoveFile = (): Returned => {
  const dispatch = useAppDispatch()

  return useCallback<Returned>(() => {
    dispatch(RepositoryActions.setRepositoryItemProps({ fileUuid: undefined }))
    dispatch(RepositoryActions.resetFile())
    dispatch(FileUploadActions.reset())
  }, [dispatch])
}
