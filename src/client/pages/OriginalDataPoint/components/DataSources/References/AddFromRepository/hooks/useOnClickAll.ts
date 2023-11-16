import { useCallback } from 'react'

import { useAssessmentCountryFiles } from 'client/store/ui/assessmentFiles'

import { useSelectedFileContext } from '../context/selectedFilesContext'

export const useOnClickAll = () => {
  const { selectedFiles, setSelectedFiles } = useSelectedFileContext()
  const countryFiles = useAssessmentCountryFiles()

  return useCallback(() => {
    if (selectedFiles.length === countryFiles.length) setSelectedFiles([])
    else setSelectedFiles(countryFiles)
  }, [countryFiles, selectedFiles.length, setSelectedFiles])
}
