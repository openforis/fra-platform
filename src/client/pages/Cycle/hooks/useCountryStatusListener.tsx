import { useEffect } from 'react'

import { AssessmentStatus, CountryIso } from 'meta/area'
import { Sockets } from 'meta/socket'

import { useAppDispatch } from 'client/store'
import { AreaActions } from 'client/store/area'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { SocketClient } from 'client/service/socket'

export const useCountryStatusListener = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  useEffect(() => {
    const eventName = Sockets.getCountryStatusUpdateEvent({
      assessmentName,
      cycleName,
      countryIso,
    })

    const handleStatusUpdate = (args: [{ status: AssessmentStatus }]) => {
      const [{ status }] = args
      dispatch(
        AreaActions.updateCountryStatus({
          assessmentName,
          cycleName,
          countryIso,
          status,
        })
      )
    }

    SocketClient.on(eventName, handleStatusUpdate)
    return () => {
      SocketClient.off(eventName, handleStatusUpdate)
    }
  }, [assessmentName, countryIso, cycleName, dispatch])
}
