import React, { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'

import { AssessmentFile } from 'meta/cycleData'

type SelectedFilesContextType = {
  selectedFiles: AssessmentFile[]
  setSelectedFiles: Dispatch<SetStateAction<AssessmentFile[]>>
}

const SelectedFilesContext = createContext<SelectedFilesContextType | undefined>(undefined)

export const SelectedFilesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState<Array<AssessmentFile>>([])

  const value = useMemo(() => ({ selectedFiles, setSelectedFiles }), [selectedFiles])

  return <SelectedFilesContext.Provider value={value}>{children}</SelectedFilesContext.Provider>
}

export const useSelectedFileContext = (): SelectedFilesContextType => useContext(SelectedFilesContext)
