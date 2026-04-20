import { useCallback, useMemo, useState } from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'

import { RepositoryListContextValue } from '../context'
import { getFolderPath } from './getFolderPath'

const _noop = (): void => undefined

type Props = {
  expanded: Record<string, boolean>
  items: Array<RepositoryItemTree>
  onCollapseAll: () => void
  onExpandAll: (uuids: Array<string>) => void
  onOpenPanel: (item: Partial<RepositoryItemTree>) => void
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
  const {
    expanded,
    items,
    onCollapseAll,
    onExpandAll,
    onOpenPanel,
    onSelect,
    onSelectFolder,
    onToggle,
    selectedUuids,
  } = props
  const selectable = Boolean(onSelect)
  const [folderTarget, setFolderTarget] = useState<string | undefined>()

  const { currentFolder, folderPath } = useMemo(() => getFolderPath(items, folderTarget), [folderTarget, items])

  const onNavigate = useCallback((uuid?: string) => setFolderTarget(uuid), [])

  const visibleItems = useMemo(() => (currentFolder ? [currentFolder] : items), [currentFolder, items])
  const folderUuids = useMemo(() => RepositoryItems.getFolderUuids(visibleItems), [visibleItems])
  const allExpanded = folderUuids.every((uuid) => expanded[uuid])

  const contextValue = useMemo<RepositoryListContextValue>(
    () => ({
      allExpanded,
      // Force the current folder to always appear expanded, even if contracted in parent view
      expanded: currentFolder ? { ...expanded, [currentFolder.uuid]: true } : expanded,
      folderPath,
      onCollapseAll,
      onExpandAll: (): void => onExpandAll(folderUuids),
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
      allExpanded,
      currentFolder,
      expanded,
      folderPath,
      folderUuids,
      onCollapseAll,
      onExpandAll,
      onNavigate,
      onOpenPanel,
      onSelect,
      onSelectFolder,
      onToggle,
      selectable,
      selectedUuids,
    ]
  )

  return { contextValue, visibleItems }
}
