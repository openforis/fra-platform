import React, { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'

type FileUploadContextType = {
  files: FileList
  setFiles: Dispatch<SetStateAction<FileList>>
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(undefined)

export const FileUploadProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [files, setFiles] = useState<FileList | null>(null)

  const value = useMemo<FileUploadContextType>(() => ({ files, setFiles }), [files])

  return <FileUploadContext.Provider value={value}>{children}</FileUploadContext.Provider>
}

export const useFileUploadContext = (): FileUploadContextType => useContext(FileUploadContext)
