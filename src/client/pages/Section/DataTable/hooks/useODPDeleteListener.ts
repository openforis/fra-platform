import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { CountryIso } from 'meta/area'
import { Sockets } from 'meta/socket'

import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
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
      const [{ countryIso, year }] = args
      dispatch(NodeValuesActions.removeOriginalDataPoint({ year, countryIso, assessmentName, cycleName }))
    }

    SocketClient.on(nodeUpdateEvent, listener)
    return () => {
      SocketClient.off(nodeUpdateEvent, listener)
    }
  }, [assessmentName, countryIso, cycleName, dispatch])
}
