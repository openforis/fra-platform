import React, { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'

import { RepositoryItem } from 'meta/cycleData'

type SelectedFilesContextType = {
  selectedFiles: RepositoryItem[]
  setSelectedFiles: Dispatch<SetStateAction<RepositoryItem[]>>
}

const SelectedFilesContext = createContext<SelectedFilesContextType | undefined>(undefined)

export const SelectedFilesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState<Array<RepositoryItem>>([])

  const value = useMemo<SelectedFilesContextType>(() => ({ selectedFiles, setSelectedFiles }), [selectedFiles])

  return <SelectedFilesContext.Provider value={value}>{children}</SelectedFilesContext.Provider>
}

export const useSelectedFileContext = (): SelectedFilesContextType => useContext(SelectedFilesContext)
