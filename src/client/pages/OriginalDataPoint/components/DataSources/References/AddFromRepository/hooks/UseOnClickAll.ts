import { useCallback } from 'react'

import { AssessmentFile } from 'meta/cycleData'

import { useAssessmentCountryFiles } from 'client/store/ui/assessmentFiles'

export const useOnClickAll = (
  selectedFiles: Array<AssessmentFile>,
  setSelectedFiles: (files: Array<AssessmentFile>) => void
) => {
  const countryFiles = useAssessmentCountryFiles()

  return useCallback(() => {
    if (selectedFiles.length === countryFiles.length) setSelectedFiles([])
    else setSelectedFiles(countryFiles)
  }, [countryFiles, selectedFiles.length, setSelectedFiles])
}
