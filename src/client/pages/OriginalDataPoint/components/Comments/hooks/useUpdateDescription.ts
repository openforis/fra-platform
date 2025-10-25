import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { ODPCommentField } from 'client/pages/OriginalDataPoint/components/Comments/types'

type Props = {
  field: ODPCommentField
}

type Returned = (value: string) => void

export const useUpdateComment = (props: Props): Returned => {
  const { field } = props
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  return useCallback<Returned>(
    (value) => {
      dispatch(
        OriginalDataPointActions.updateOriginalDataPointDescription({
          countryIso: countryIso as CountryIso,
          cycleName,
          assessmentName,
          originalDataPoint: {
            ...originalDataPoint,
            [field]: value,
          },
        })
      )
    },
    [assessmentName, countryIso, cycleName, dispatch, field, originalDataPoint]
  )
}
