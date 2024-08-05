import { useCallback } from 'react'

import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'

export const useIsChecked = (): ((uuid: string) => boolean) => {
  const { selectedFiles } = useRepositoryLinkContext()

  return useCallback(
    (uuid: string) => selectedFiles.some((selectedFile) => selectedFile.uuid === uuid),
    [selectedFiles]
  )
}
