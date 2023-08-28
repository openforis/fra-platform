import { useEffect } from 'react'

import { Sockets } from 'meta/socket'
import { Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useCycle } from 'client/store/assessment'
import { ReviewActions } from 'client/store/ui/review'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { SocketClient } from 'client/service/socket'

export const useReviewSummaryListener = (): void => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const dispatch = useAppDispatch()
  const cycle = useCycle()
  const user = useUser()
  const hasRoleInCountry = Users.hasRoleInCountry({ user, cycle, countryIso })

  useEffect(() => {
    const eventName = Sockets.getRequestReviewSummaryEvent({ countryIso, assessmentName, cycleName })

    const updateReviewSummaryEventHandler = () => {
      dispatch(ReviewActions.getReviewSummary({ countryIso, assessmentName, cycleName }))
    }

    if (hasRoleInCountry) {
      // fetch review summary
      dispatch(ReviewActions.getReviewSummary({ countryIso, assessmentName, cycleName }))
      SocketClient.on(eventName, updateReviewSummaryEventHandler)
    }

    return () => {
      dispatch(ReviewActions.reset())
      if (hasRoleInCountry) {
        SocketClient.off(eventName, updateReviewSummaryEventHandler)
      }
    }
  }, [assessmentName, countryIso, cycleName, dispatch, hasRoleInCountry])
}
