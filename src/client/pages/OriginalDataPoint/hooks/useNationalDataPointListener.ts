import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Routes } from 'meta/routes/routes'
import { Sockets } from 'meta/socket/sockets'

import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useAppDispatch } from 'client/store/hooks'
import { useOriginalDataPointRouteParams } from 'client/hooks/routeParams'
import { SocketClient } from 'client/service/socket/client'

type NationalDataPointUpdateListenerArgs = [{ nationalDataPoint: OriginalDataPoint }]

export const useNationalDataPointListener = (): void => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { assessmentName, countryIso, cycleName, sectionName } = useOriginalDataPointRouteParams()
  const { uuid: nationalDataPointUuid, year: nationalDataPointYear } = useOriginalDataPoint()

  useEffect(() => {
    // New point not created yet
    if (!nationalDataPointUuid) return

    const eventName = Sockets.getNationalDataPointUpdateEvent({ uuid: nationalDataPointUuid })

    const listener = (args: NationalDataPointUpdateListenerArgs): void => {
      const [{ nationalDataPoint }] = args

      // == Year changed
      if (nationalDataPoint.year !== nationalDataPointYear) {
        const routeParams = { assessmentName, countryIso, cycleName, sectionName, year: String(nationalDataPoint.year) }
        navigate(Routes.OriginalDataPoint.generatePath(routeParams), { replace: true })
        return
      }

      // == Values changed
      dispatch(OriginalDataPointActions.setNationalDataPoint(nationalDataPoint))
    }

    SocketClient.on(eventName, listener)

    return (): void => {
      SocketClient.off(eventName, listener)
    }
  }, [
    assessmentName,
    countryIso,
    cycleName,
    dispatch,
    nationalDataPointUuid,
    nationalDataPointYear,
    navigate,
    sectionName,
  ])
}
