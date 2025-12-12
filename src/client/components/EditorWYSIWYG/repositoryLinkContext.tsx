import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import type { IControlType, IJodit } from 'jodit/esm/types'

import { RepositoryItem } from 'meta/cycleData/repository/item'

export type RepositoryLinkContextType = {
  jodit?: IJodit
  setJodit: Dispatch<SetStateAction<IJodit>>
  repositoryButton: IControlType
  repositoryOpened: boolean
  setRepositoryOpened: Dispatch<SetStateAction<boolean>>
  selectedFiles: Array<RepositoryItem>
  setSelectedFiles: Dispatch<SetStateAction<Array<RepositoryItem>>>
}

export const RepositoryLinkContext = createContext<RepositoryLinkContextType | undefined>(undefined)

export const useRepositoryLinkContext = (): RepositoryLinkContextType => useContext(RepositoryLinkContext)
