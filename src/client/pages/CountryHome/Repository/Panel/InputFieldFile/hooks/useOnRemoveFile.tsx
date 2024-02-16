import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { FileUploadActions } from 'client/store/ui/fileUpload'
import { RepositoryActions } from 'client/store/ui/repository'

export const useOnRemoveFile = (): (() => void) => {
  const dispatch = useAppDispatch()
  return useCallback<() => void>(() => {
    dispatch(RepositoryActions.setRepositoryItemProps({ fileUuid: undefined }))
    dispatch(FileUploadActions.reset())
  }, [dispatch])
}
