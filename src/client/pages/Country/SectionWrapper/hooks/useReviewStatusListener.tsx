import { useEffect } from 'react'

import { Sockets } from 'meta/socket'

import { useAppDispatch } from 'client/store'
import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { ReviewActions } from 'client/store/ui/review'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { SocketClient } from 'client/service/socket'

export const useReviewStatusListener = (): void => {
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const user = useUser()
  const originalDataPoint = useOriginalDataPoint()

  const odpId = originalDataPoint?.id

  // subscribe to section review status update
  useEffect(() => {
    const eventProps = { assessmentName, cycleName, countryIso, sectionName }
    const reviewStatusEvent = Sockets.getRequestReviewStatusEvent(eventProps)

    const getReviewStatus = () => {
      dispatch(ReviewActions.getReviewStatus({ ...eventProps, odpId }))
    }

    if (user) {
      getReviewStatus()
      SocketClient.on(reviewStatusEvent, getReviewStatus)
    }

    return () => {
      if (user) {
        SocketClient.off(reviewStatusEvent, getReviewStatus)
      }
    }
  }, [countryIso, assessmentName, cycleName, sectionName, user, dispatch, odpId])
}
