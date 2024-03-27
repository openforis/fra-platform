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
  const editor = Users.hasEditorRole({ countryIso, cycle, user })

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
