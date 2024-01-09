import { useMemo } from 'react'

import { useAssessmentCountryFiles } from 'client/store/ui/assessmentFiles'

import { useIsChecked } from './useIsChecked'

export const useAllSelected = (): boolean => {
  const countryFiles = useAssessmentCountryFiles()
  const isChecked = useIsChecked()

  return useMemo(
    () => countryFiles.every((assessmentFile) => isChecked(assessmentFile.uuid)),
    [countryFiles, isChecked]
  )
}
