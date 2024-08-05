import { useCallback } from 'react'

import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'

import { useIsChecked } from './useIsChecked'
import { useRepositoryItems } from './useRepositoryItems'

export const useOnClick = (): ((uuid: string) => void) => {
  const { selectedFiles, setSelectedFiles } = useRepositoryLinkContext()

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
