import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { AssessmentFile } from 'meta/cycleData'

import { useAppDispatch } from 'client/store/store'
import { AssessmentFilesActions } from 'client/store/ui/assessmentFiles/slice'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  files: Array<AssessmentFile>
  public: boolean
  fileCountryIso?: CountryIso
}
type Returned = (props: Props) => void

export const useUpdateAccess = (): Returned => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  return useCallback<Returned>(
    (props: Props) => {
      const { files, public: _public, fileCountryIso } = props

      const params = { assessmentName, cycleName, countryIso, fileCountryIso, files, public: _public }
      dispatch(AssessmentFilesActions.updateAccess(params))
    },
    [dispatch, assessmentName, cycleName, countryIso]
  )
}
