import React, { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useUpdateAccess } from 'client/store/ui/assessmentFiles'
import { AssessmentFileLoading } from 'client/store/ui/assessmentFiles/stateType'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useOnSelectChange = (assessmentFile: AssessmentFileLoading) => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const updateAccess = useUpdateAccess()

  return useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      updateAccess({
        files: [assessmentFile],
        public: event.target.value === 'public',
        fileCountryIso: countryIso,
      })
    },
    [assessmentFile, countryIso, updateAccess]
  )
}
