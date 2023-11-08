import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch, useAppSelector } from 'client/store'
import { AssessmentFilesActions } from 'client/store/ui/assessmentFiles/slice'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { AssessmentFilesState } from '../stateType'

export const useAssessmentFiles = (): AssessmentFilesState => useAppSelector((state) => state.ui.assessmentFiles)

export const useGetAssessmentFiles = (): void => {
  const { assessmentName, cycleName, countryIso: _countryIso } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      AssessmentFilesActions.getFiles({
        assessmentName,
        cycleName,
        countryIso,
      })
    )
  }, [dispatch, assessmentName, cycleName, countryIso])
}
