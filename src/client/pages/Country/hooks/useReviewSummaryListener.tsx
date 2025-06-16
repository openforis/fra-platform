import { useEffect } from 'react'

import { Sockets } from 'meta/socket'

import { useAppDispatch } from 'client/store/hooks'
import { ReviewActions } from 'client/store/review/actions'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { SocketClient } from 'client/service/socket'

export const useReviewSummaryListener = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const dispatch = useAppDispatch()
  const editor = useCanEditCycleData()

  useEffect(() => {
    const eventName = Sockets.getRequestReviewSummaryEvent({ countryIso, assessmentName, cycleName })

    const getReviewSummary = () => {
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
