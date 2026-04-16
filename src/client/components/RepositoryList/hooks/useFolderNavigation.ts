import { useCallback, useMemo, useState } from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import { RepositoryListContextValue } from '../context'
import { getFolderPath } from './getFolderPath'

const _noop = (): void => undefined

type Props = {
  collapsed: Record<string, boolean>
  items: Array<RepositoryItemTree>
  onOpenPanel?: (item: Partial<RepositoryItemTree>) => void
  onSelect?: (item: RepositoryItemTree) => void
  onSelectFolder?: (items: Array<RepositoryItemTree>, select: boolean) => void
  onToggle: (uuid: string) => void
  selectedUuids: Array<string>
}

type Returned = {
  contextValue: RepositoryListContextValue
  visibleItems: Array<RepositoryItemTree>
}

export const useFolderNavigation = (props: Props): Returned => {
  const { collapsed, items, onOpenPanel, onSelect, onSelectFolder, onToggle, selectedUuids } = props
  const selectable = Boolean(onSelect)
  const [folderTarget, setFolderTarget] = useState<string | undefined>()

  const { currentFolder, folderPath } = useMemo(() => getFolderPath(items, folderTarget), [folderTarget, items])

  const onNavigate = useCallback((uuid?: string) => setFolderTarget(uuid), [])

  const contextValue = useMemo<RepositoryListContextValue>(
    () => ({
      // Force the current folder to always appear expanded, even if contracted in parent view
      collapsed: currentFolder ? { ...collapsed, [currentFolder.uuid]: false } : collapsed,
      folderPath,
      onNavigate,
      onOpenPanel,
      onSelect: onSelect ?? _noop,
      onSelectFolder: onSelectFolder ?? _noop,
      onToggle,
      parentUuid: currentFolder?.uuid,
      selectable,
      selectedUuids,
    }),
    [
      collapsed,
      currentFolder,
      folderPath,
      onNavigate,
      onOpenPanel,
      onSelect,
      onSelectFolder,
      onToggle,
      selectable,
      selectedUuids,
    ]
  )

  return { contextValue, visibleItems: currentFolder ? [currentFolder] : items }
}
