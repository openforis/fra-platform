import { createContext, useContext } from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

export type RepositoryListContextValue = {
  collapsed: Record<string, boolean>
  folderPath: Array<RepositoryItemTree>
  onNavigate: (uuid: string | null) => void
  onToggle: (uuid: string) => void
  parentUuid: string | undefined
}

export const RepositoryListContext = createContext<RepositoryListContextValue | undefined>(undefined)

export const useRepositoryListContext = (): RepositoryListContextValue =>
  useContext<RepositoryListContextValue>(RepositoryListContext)
