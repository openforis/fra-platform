import React, { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'

type SelectedFilesContextType = {
  selectedFiles: FileList
  setSelectedFiles: Dispatch<SetStateAction<FileList>>
}

const SelectedFilesContext = createContext<SelectedFilesContextType | undefined>(undefined)

export const SelectedFilesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  const value = useMemo<SelectedFilesContextType>(() => ({ selectedFiles, setSelectedFiles }), [selectedFiles])

  return <SelectedFilesContext.Provider value={value}>{children}</SelectedFilesContext.Provider>
}

export const useSelectedFileContext = (): SelectedFilesContextType => useContext(SelectedFilesContext)
