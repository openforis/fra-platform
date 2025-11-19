import { useEffect } from 'react'

import { Sockets } from 'meta/socket/sockets'

import { useAppDispatch } from 'client/store/hooks'
import { ReviewActions } from 'client/store/review/actions'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

export const useReviewSummaryListener = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const dispatch = useAppDispatch()
  const editor = useCanEditCycleData()

  useEffect(() => {
    const eventName = Sockets.getRequestReviewSummaryEvent({ countryIso, assessmentName, cycleName })

    const getReviewSummary = (): void => {
      dispatch(ReviewActions.getReviewSummary({ countryIso, assessmentName, cycleName }))
    }

    if (editor) {
      getReviewSummary()
      SocketClient.on(eventName, getReviewSummary)
    }

    return () => {
      dispatch(ReviewActions.reset())
      if (editor) {
        SocketClient.off(eventName, getReviewSummary)
      }
    }
  }, [assessmentName, countryIso, cycleName, dispatch, editor])
}
