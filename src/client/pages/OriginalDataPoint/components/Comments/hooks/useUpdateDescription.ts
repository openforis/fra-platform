import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'

import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = {
  field: OriginalDataPointCommentKey
}

type Returned = (value: string) => void

export const useUpdateComment = (props: Props): Returned => {
  const { field } = props
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  return useCallback<Returned>(
    (value) => {
      const comments = originalDataPoint.comments ?? {}
      const updatedOriginalDataPoint = {
        ...originalDataPoint,
        comments: {
          ...comments,
          [field]: value,
        },
      }

      dispatch(
        OriginalDataPointActions.updateOriginalDataPointDescription({
          countryIso: countryIso as CountryIso,
          cycleName,
          assessmentName,
          field,
          originalDataPoint: updatedOriginalDataPoint,
        })
      )
    },
    [assessmentName, countryIso, cycleName, dispatch, field, originalDataPoint]
  )
}
