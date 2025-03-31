import { useEffect } from 'react'

import { AssessmentStatus, CountryIso } from 'meta/area'
import { Sockets } from 'meta/socket'

import { useAppDispatch } from 'client/store'
import { AreaActions } from 'client/store/area'
import { useAssessment, useCycle } from 'client/store/assessment'
import { SocketClient } from 'client/service/socket'

export const useCountryStatusListener = (): void => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()

  useEffect(() => {
    const eventName = Sockets.getCountryStatusUpdateEvent({
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
    })

    const handleStatusUpdate = (args: [{ [key: string]: AssessmentStatus }]) => {
      const [statusUpdate] = args
      Object.keys(statusUpdate).forEach((countryIso) => {
        const status = statusUpdate[countryIso]
        dispatch(
          AreaActions.updateCountryStatus({
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
            countryIso: countryIso as CountryIso,
            status,
          })
        )
      })
    }

    SocketClient.on(eventName, handleStatusUpdate)
    return () => {
      SocketClient.off(eventName, handleStatusUpdate)
    }
  }, [assessment, cycle, dispatch])
}
