import { createContext, useContext } from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

export type RepositoryListContextValue = {
  collapsed: Record<string, boolean>
  folderPath: Array<RepositoryItemTree>
  onNavigate: (uuid?: string) => void
  onOpenPanel?: (item: Partial<RepositoryItemTree>) => void
  onSelect: (item: RepositoryItemTree) => void
  onSelectFolder: (items: Array<RepositoryItemTree>, select: boolean) => void
  onToggle: (uuid: string) => void
  parentUuid: string | undefined
  selectable: boolean
  selectedUuids: Array<string>
}

export const RepositoryListContext = createContext<RepositoryListContextValue | undefined>(undefined)

export const useRepositoryListContext = (): RepositoryListContextValue =>
  useContext<RepositoryListContextValue>(RepositoryListContext)
