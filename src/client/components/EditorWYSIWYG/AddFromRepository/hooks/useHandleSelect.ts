import { useCallback } from 'react'

import { RepositoryItem, RepositoryItemTree } from 'meta/cycleData/repository/item'

import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'

type Returned = {
  onSelect: (item: RepositoryItemTree) => void
  onSelectFolder: (items: Array<RepositoryItemTree>, select: boolean) => void
  selectedUuids: Array<string>
}

export const useHandleSelect = (): Returned => {
  const { selectedFiles, setSelectedFiles } = useRepositoryLinkContext()

  const onSelectMany = useCallback(
    (items: Array<RepositoryItemTree>, select: boolean) => {
      setSelectedFiles((prev: Array<RepositoryItem>) => {
        if (select) {
          const newItems = items.filter((item) => !prev.some((f) => f.uuid === item.uuid))
          return [...prev, ...newItems]
        }
        const uuids = new Set(items.map((item) => item.uuid))
        return prev.filter((f) => !uuids.has(f.uuid))
      })
    },
    [setSelectedFiles]
  )

  const onSelect = useCallback(
    (item: RepositoryItemTree) => {
      const isSelected = selectedFiles.some((f) => f.uuid === item.uuid)
      onSelectMany([item], !isSelected)
    },
    [onSelectMany, selectedFiles]
  )

  const onSelectFolder = useCallback(
    (items: Array<RepositoryItemTree>, select: boolean) => onSelectMany(items, select),
    [onSelectMany]
  )

  const selectedUuids = selectedFiles.map((f) => f.uuid)

  return { onSelect, onSelectFolder, selectedUuids }
}
