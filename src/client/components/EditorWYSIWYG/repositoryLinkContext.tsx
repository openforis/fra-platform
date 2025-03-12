import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import type { IControlType, IJodit } from 'jodit/types'

import { RepositoryItem } from 'meta/cycleData'

export type RepositoryLinkContextType = {
  jodit?: IJodit
  setJodit: Dispatch<SetStateAction<IJodit>>
  repositoryButton: IControlType
  repositoryOpened: boolean
  setRepositoryOpened: Dispatch<SetStateAction<boolean>>
  selectedFiles: RepositoryItem[]
  setSelectedFiles: Dispatch<SetStateAction<RepositoryItem[]>>
}

export const RepositoryLinkContext = createContext<RepositoryLinkContextType | undefined>(undefined)

export const useRepositoryLinkContext = (): RepositoryLinkContextType => useContext(RepositoryLinkContext)
