import { useEffect } from 'react'

import { CountryIso } from 'meta/area'
import { Sockets } from 'meta/socket'

import { useAppDispatch } from 'client/store'
import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { ReviewActions } from 'client/store/ui/review'
import { useCanEditCycleData, useUser } from 'client/store/user'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { SocketClient } from 'client/service/socket'

export const useReviewStatusListener = (): void => {
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const user = useUser()
  const editor = useCanEditCycleData()

  const originalDataPoint = useOriginalDataPoint()

  const odpId = originalDataPoint?.id

  // subscribe to section review status update
  useEffect(() => {
    const eventProps = { assessmentName, cycleName, countryIso, sectionName }
    const reviewStatusEvent = Sockets.getRequestReviewStatusEvent(eventProps)

    const getReviewStatus = () => {
      dispatch(ReviewActions.getReviewStatus({ ...eventProps, odpId }))
    }

    if (editor) {
      getReviewStatus()
      SocketClient.on(reviewStatusEvent, getReviewStatus)
    }

    return () => {
      if (user) {
        SocketClient.off(reviewStatusEvent, getReviewStatus)
      }
    }
  }, [assessmentName, countryIso, cycleName, dispatch, editor, odpId, sectionName, user])
}
