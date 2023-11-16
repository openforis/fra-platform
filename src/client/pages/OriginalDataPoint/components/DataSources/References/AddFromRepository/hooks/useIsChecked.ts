import { useCallback } from 'react'

import { useSelectedFileContext } from '../context/selectedFilesContext'

export const useIsChecked = () => {
  const { selectedFiles } = useSelectedFileContext()

  return useCallback(
    (uuid: string) => selectedFiles.some((selectedFile) => selectedFile.uuid === uuid),
    [selectedFiles]
  )
}
