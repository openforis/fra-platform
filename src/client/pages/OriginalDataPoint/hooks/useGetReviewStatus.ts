import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { ReviewActions } from 'client/store/ui/review'
import { useUser } from 'client/store/user'
import { useOriginalDataPointRouteParams } from 'client/hooks/useRouteParams'

export const useGetReviewStatus = () => {
  const dispatch = useAppDispatch()

  const user = useUser()

  const odpId = useOriginalDataPoint()?.id
  const { assessmentName, cycleName, countryIso, sectionName } = useOriginalDataPointRouteParams()

  useEffect(() => {
    if (user) {
      dispatch(
        ReviewActions.getReviewStatus({
          countryIso: countryIso as CountryIso,
          assessmentName,
          cycleName,
          sectionName,
          odpId,
        })
      )
    }
  }, [odpId, countryIso, assessmentName, cycleName, user, dispatch, sectionName])
}
