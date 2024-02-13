import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { FileUploadActions } from 'client/store/ui/fileUpload'

export const useResetFilesOnUnmount = (): void => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(FileUploadActions.reset())
    }
  }, [dispatch])
}
