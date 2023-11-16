import { useCallback } from 'react'

import { AssessmentFile } from 'meta/cycleData'

import { useAssessmentCountryFiles } from 'client/store/ui/assessmentFiles'

import { useIsChecked } from './UseIsChecked'

export const useOnClick = (
  selectedFiles: Array<AssessmentFile>,
  setSelectedFiles: (files: Array<AssessmentFile>) => void
) => {
  const countryFiles = useAssessmentCountryFiles()
  const isChecked = useIsChecked(selectedFiles)

  return useCallback(
    (uuid: string) => {
      if (isChecked(uuid)) setSelectedFiles(selectedFiles.filter((selectedFile) => selectedFile.uuid !== uuid))
      else setSelectedFiles([...selectedFiles, countryFiles.find((file) => file.uuid === uuid)])
    },
    [countryFiles, isChecked, selectedFiles, setSelectedFiles]
  )
}
