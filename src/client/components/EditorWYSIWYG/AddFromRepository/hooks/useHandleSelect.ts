import { useCallback } from 'react'

import { RepositoryItem, RepositoryItemTree } from 'meta/cycleData/repository/item'

import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'

type Returned = {
  onSelect: (item: RepositoryItemTree) => void
  selectedUuids: Array<string>
}

export const useHandleSelect = (): Returned => {
  const { selectedFiles, setSelectedFiles } = useRepositoryLinkContext()

  const onSelect = useCallback(
    (item: RepositoryItemTree) => {
      const isSelected = selectedFiles.some((f) => f.uuid === item.uuid)
      setSelectedFiles((prev: Array<RepositoryItem>) => {
        if (isSelected) return prev.filter((f) => f.uuid !== item.uuid)
        return [...prev, item]
      })
    },
    [selectedFiles, setSelectedFiles]
  )

  const selectedUuids = selectedFiles.map((f) => f.uuid)

  return { onSelect, selectedUuids }
}
