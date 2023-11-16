import { useMemo } from 'react'

import { AssessmentFile } from 'meta/cycleData'

import { useAssessmentCountryFiles } from 'client/store/ui/assessmentFiles'

import { useIsChecked } from './UseIsChecked'

export const useAllSelected = (selectedFiles: Array<AssessmentFile>) => {
  const countryFiles = useAssessmentCountryFiles()
  const isChecked = useIsChecked(selectedFiles)

  return useMemo(
    () => countryFiles.every((assessmentFile) => isChecked(assessmentFile.uuid)),
    [countryFiles, isChecked]
  )
}
