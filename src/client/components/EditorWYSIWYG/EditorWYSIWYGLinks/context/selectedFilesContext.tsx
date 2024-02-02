import React, { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'

import { AssessmentFile } from 'meta/cycleData'

/**
 * @deprecated
 */
type SelectedFilesContextType = {
  selectedFiles: AssessmentFile[]
  setSelectedFiles: Dispatch<SetStateAction<AssessmentFile[]>>
}
/**
 * @deprecated
 */
const SelectedFilesContext = createContext<SelectedFilesContextType | undefined>(undefined)

/**
 * @deprecated
 */
export const SelectedFilesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState<Array<AssessmentFile>>([])

  const value = useMemo<SelectedFilesContextType>(() => ({ selectedFiles, setSelectedFiles }), [selectedFiles])

  return <SelectedFilesContext.Provider value={value}>{children}</SelectedFilesContext.Provider>
}

/**
 * @deprecated
 */
export const useSelectedFileContext = (): SelectedFilesContextType => useContext(SelectedFilesContext)
