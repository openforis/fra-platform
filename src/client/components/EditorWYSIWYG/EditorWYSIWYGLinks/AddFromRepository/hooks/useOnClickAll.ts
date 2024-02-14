import { useCallback } from 'react'

import { useRepositoryItems } from 'client/store/ui/repository/hooks'

import { useSelectedFileContext } from '../../context/selectedFilesContext'

export const useOnClickAll = (): (() => void) => {
  const { selectedFiles, setSelectedFiles } = useSelectedFileContext()
  const repositoryItems = useRepositoryItems()

  return useCallback(() => {
    if (selectedFiles.length === repositoryItems.length) setSelectedFiles([])
    else setSelectedFiles(repositoryItems)
  }, [repositoryItems, selectedFiles.length, setSelectedFiles])
}
