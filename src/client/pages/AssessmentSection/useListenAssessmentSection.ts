import { useEffect } from 'react'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket'

import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { SocketClient } from '@client/service/socket'

type Props = {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
  sectionName: string
}

type WebsocketResponse = any // TODO: Add type when known/decided what websocket emits

export const useListenAssessmentSection = (props: Props): void => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const nodeUpdateEvent = Sockets.getAssessmentSectionUpdateEvent(props)

    const listener = (args: [WebsocketResponse]): void => {
      const [{ calculations, validations, ...rest }] = args
      dispatch(AssessmentSectionActions.setNodeValues({ ...rest, validations, nodeUpdates: calculations }))
    }

    SocketClient.on(nodeUpdateEvent, listener)
    return () => {
      SocketClient.off(nodeUpdateEvent, listener)
    }
  }, [dispatch, props])
}
