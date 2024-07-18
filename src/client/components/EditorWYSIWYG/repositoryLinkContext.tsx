import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import type { IControlType } from 'jodit/esm/types'
import { Jodit } from 'jodit-react'

import { RepositoryItem } from 'meta/cycleData'

export type RepositoryLinkContextType = {
  jodit?: Jodit
  setJodit: Dispatch<SetStateAction<Jodit>>
  repositoryButton: IControlType
  repositoryOpened: boolean
  setRepositoryOpened: Dispatch<SetStateAction<boolean>>
  selectedFiles: RepositoryItem[]
  setSelectedFiles: Dispatch<SetStateAction<RepositoryItem[]>>
}

export const RepositoryLinkContext = createContext<RepositoryLinkContextType | undefined>(undefined)

export const useRepositoryLinkContext = (): RepositoryLinkContextType => useContext(RepositoryLinkContext)
