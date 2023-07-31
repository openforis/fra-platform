import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { CountryIso } from 'meta/area'
import { Sockets } from 'meta/socket'

import { useAssessment, useCycle } from 'client/store/assessment'
import { DataActions } from 'client/store/data'
import { useCountryIso } from 'client/hooks'
import { SocketClient } from 'client/service/socket'

// Listen to websocket updates for deleting an odp
// ODP deleted from data by countryIso, year
export const useODPDeleteListener = () => {
  const dispatch = useDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

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
  }, [assessmentName, countryIso, cycleName, dispatch])
}
