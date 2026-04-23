import { createContext, useContext } from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

export type RepositoryListContextValue = {
  allExpanded: boolean
  expanded: Record<string, boolean>
  folderPath: Array<RepositoryItemTree>
  hasFolders: boolean
  onCollapseAll: () => void
  onExpandAll: () => void
  onNavigate: (uuid?: string) => void
  onOpenPanel: (item: Partial<RepositoryItemTree>) => void
  onSelect: (item: RepositoryItemTree) => void
  onToggle: (uuid: string) => void
  parentUuid: string | undefined
  readOnly: boolean
  selectable: boolean
  selectedUuids: Array<string>
}

export const RepositoryListContext = createContext<RepositoryListContextValue | undefined>(undefined)

export const useRepositoryListContext = (): RepositoryListContextValue =>
  useContext<RepositoryListContextValue>(RepositoryListContext)
