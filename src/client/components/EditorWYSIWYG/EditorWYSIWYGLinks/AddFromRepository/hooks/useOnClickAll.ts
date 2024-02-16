import { useCallback } from 'react'

import { useSelectedFileContext } from '../../context/selectedFilesContext'
import { useRepositoryItems } from './useRepositoryItems'

export const useOnClickAll = (): (() => void) => {
  const { selectedFiles, setSelectedFiles } = useSelectedFileContext()
  const repositoryItems = useRepositoryItems()

  return useCallback(() => {
    if (selectedFiles.length === repositoryItems.length) setSelectedFiles([])
    else setSelectedFiles(repositoryItems)
  }, [repositoryItems, selectedFiles.length, setSelectedFiles])
}
