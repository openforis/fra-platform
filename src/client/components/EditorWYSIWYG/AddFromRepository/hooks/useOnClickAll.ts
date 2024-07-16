import { useCallback } from 'react'

import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'

import { useRepositoryItems } from './useRepositoryItems'

export const useOnClickAll = (): (() => void) => {
  const { selectedFiles, setSelectedFiles } = useRepositoryLinkContext()
  const repositoryItems = useRepositoryItems()

  return useCallback(() => {
    if (selectedFiles.length === repositoryItems.length) setSelectedFiles([])
    else setSelectedFiles(repositoryItems)
  }, [repositoryItems, selectedFiles.length, setSelectedFiles])
}
