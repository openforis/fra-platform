import { useCallback } from 'react'

import { useRepositoryItems } from 'client/store/ui/repository/hooks'

import { useSelectedFileContext } from '../../context/selectedFilesContext'
import { useIsChecked } from './useIsChecked'

export const useOnClick = (): ((uuid: string) => void) => {
  const { selectedFiles, setSelectedFiles } = useSelectedFileContext()

  const repositoryItems = useRepositoryItems()
  const isChecked = useIsChecked()

  return useCallback(
    (uuid: string) => {
      if (isChecked(uuid)) setSelectedFiles(selectedFiles.filter((selectedFile) => selectedFile.uuid !== uuid))
      else setSelectedFiles([...selectedFiles, repositoryItems.find((file) => file.uuid === uuid)])
    },
    [repositoryItems, isChecked, selectedFiles, setSelectedFiles]
  )
}
