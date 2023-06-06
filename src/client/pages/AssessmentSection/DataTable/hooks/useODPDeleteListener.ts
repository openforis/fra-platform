import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { CountryIso } from 'meta/area'
import { Sockets } from 'meta/socket'

import { DataActions } from 'client/store/data'
import { SocketClient } from 'client/service/socket'

// Listen to websocket updates for deleting an odp
// ODP deleted from data by countryIso, year
export const useODPDeleteListener = (props: { assessmentName: string; cycleName: string; countryIso: CountryIso }) => {
  const { countryIso, assessmentName, cycleName } = props
  const dispatch = useDispatch()

  useEffect(() => {
    const nodeUpdateEvent = Sockets.getODPDeleteEvent({ assessmentName, cycleName, countryIso })

    const listener = (args: [{ year: string; countryIso: CountryIso }]): void => {
      const [{ year, countryIso }] = args
      dispatch(DataActions.deleteOriginalDataPoint({ year, countryIso, assessmentName, cycleName }))
    }

    SocketClient.on(nodeUpdateEvent, listener)
    return () => {
      SocketClient.off(nodeUpdateEvent, listener)
    }
  }, [assessmentName, countryIso, cycleName, dispatch, props])
}
