import { useCallback, useMemo, useState } from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
import { Objects } from 'utils/objects'

import { RepositoryListContextValue } from '../context'
import { getFolderPath } from './getFolderPath'

const _noop = (): void => undefined

type Props = {
  allowEditing: boolean
  allowFiltering: boolean
  allowSorting: boolean
  expanded: Record<string, boolean>
  isGlobal: boolean
  items: Array<RepositoryItemTree>
  onCollapseAll: () => void
  onExpandAll: (uuids: Array<string>) => void
  onOpenPanel: (item: Partial<RepositoryItemTree>) => void
  onSelect?: (item: RepositoryItemTree) => void
  onToggle: (uuid: string) => void
  selectedUuids: Array<string>
  showColumns: boolean
}

type Returned = {
  contextValue: RepositoryListContextValue
  visibleItems: Array<RepositoryItemTree>
}

export const useFolderNavigation = (props: Props): Returned => {
  const {
    allowEditing,
    allowFiltering,
    allowSorting,
    expanded,
    isGlobal,
    items,
    onCollapseAll,
    onExpandAll,
    onOpenPanel,
    onSelect,
    onToggle,
    selectedUuids,
    showColumns,
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
      allowEditing,
      allowFiltering,
      allowSorting,
      allExpanded,
      // Force the current folder to always appear expanded, even if contracted in parent view
      expanded: currentFolder ? { ...expanded, [currentFolder.uuid]: true } : expanded,
      folderPath,
      hasFolders: !Objects.isEmpty(folderUuids),
      isGlobal,
      onCollapseAll,
      onExpandAll: (): void => onExpandAll(folderUuids),
      onNavigate,
      onOpenPanel,
      onSelect: onSelect ?? _noop,
      onToggle,
      parentUuid: currentFolder?.uuid,
      selectable,
      selectedUuids,
      showColumns,
    }),
    [
      allExpanded,
      allowEditing,
      allowFiltering,
      allowSorting,
      currentFolder,
      expanded,
      folderPath,
      folderUuids,
      isGlobal,
      onCollapseAll,
      onExpandAll,
      onNavigate,
      onOpenPanel,
      onSelect,
      onToggle,
      selectable,
      selectedUuids,
      showColumns,
    ]
  )

  return { contextValue, visibleItems }
}
