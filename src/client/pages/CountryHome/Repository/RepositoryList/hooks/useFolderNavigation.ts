import { useCallback, useMemo, useState } from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import { RepositoryListContextValue } from '../context'
import { getFolderPath } from './getFolderPath'

type Props = {
  collapsed: Record<string, boolean>
  items: Array<RepositoryItemTree>
  onToggle: (uuid: string) => void
}

type Returned = {
  contextValue: RepositoryListContextValue
  visibleItems: Array<RepositoryItemTree>
}

export const useFolderNavigation = (props: Props): Returned => {
  const { collapsed, items, onToggle } = props
  const [folderTarget, setFolderTarget] = useState<string | null>(null)

  const { currentFolder, folderPath } = useMemo(() => getFolderPath(items, folderTarget), [folderTarget, items])

  const onNavigate = useCallback((uuid: string | null) => setFolderTarget(uuid), [])

  const contextValue = useMemo<RepositoryListContextValue>(
    () => ({
      // Force the current folder to always appear expanded, even if contracted in parent view
      collapsed: currentFolder ? { ...collapsed, [currentFolder.uuid]: false } : collapsed,
      folderPath,
      onNavigate,
      onToggle,
      parentUuid: currentFolder?.uuid,
    }),
    [collapsed, currentFolder, folderPath, onNavigate, onToggle]
  )

  return { contextValue, visibleItems: currentFolder ? [currentFolder] : items }
}
