import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useUploadAssessmentFile } from 'client/store/ui/assessmentFiles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useOnDrop = (): ((files: Array<File>) => void) => {
  const uploadAssessmentFile = useUploadAssessmentFile()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback(
    (files: Array<File>) => {
      files.forEach((file) => {
        const uploadProps = { fileCountryIso: countryIso, file }
        uploadAssessmentFile(uploadProps)
      })
    },
    [countryIso, uploadAssessmentFile]
  )
}
