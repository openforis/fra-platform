import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store/store'
import { AssessmentFilesActions } from 'client/store/ui/assessmentFiles/slice'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useGetAssessmentFiles = (): void => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      AssessmentFilesActions.getFiles({
        assessmentName,
        cycleName,
        countryIso,
      })
    )
  }, [countryIso, dispatch, assessmentName, cycleName])
}
