import { useCallback } from 'react'

import { useAssessmentCountryFiles } from 'client/store/ui/assessmentFiles'

import { useSelectedFileContext } from '../context/selectedFilesContext'
import { useIsChecked } from './useIsChecked'

export const useOnClick = (): ((uuid: string) => void) => {
  const { selectedFiles, setSelectedFiles } = useSelectedFileContext()

  const countryFiles = useAssessmentCountryFiles()
  const isChecked = useIsChecked()

  return useCallback(
    (uuid: string) => {
      if (isChecked(uuid)) setSelectedFiles(selectedFiles.filter((selectedFile) => selectedFile.uuid !== uuid))
      else setSelectedFiles([...selectedFiles, countryFiles.find((file) => file.uuid === uuid)])
    },
    [countryFiles, isChecked, selectedFiles, setSelectedFiles]
  )
}
