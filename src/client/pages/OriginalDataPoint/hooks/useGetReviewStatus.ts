import { useEffect } from 'react'

import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useAppDispatch } from 'client/store/hooks'
import { ReviewActions } from 'client/store/review/actions'
import { useUser } from 'client/store/user/hooks/user'
import { useOriginalDataPointRouteParams } from 'client/hooks/routeParams'

export const useGetReviewStatus = (): void => {
  const dispatch = useAppDispatch()

  const user = useUser()

  const odpId = useOriginalDataPoint()?.id
  const { assessmentName, countryIso, cycleName, sectionName } = useOriginalDataPointRouteParams()

  useEffect(() => {
    if (user) {
      dispatch(
        ReviewActions.getReviewStatus({
          countryIso,
          assessmentName,
          cycleName,
          sectionName,
          odpId,
        })
      )
    }
  }, [assessmentName, countryIso, cycleName, dispatch, odpId, sectionName, user])
}
