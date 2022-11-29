import { useEffect } from 'react'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { NodeUpdate } from '@meta/data'
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

type WebsocketResponse = {
  tableName: string
  countryIso: CountryIso
  validations: Array<NodeUpdate>
}

export const useListenValidationsUpdate = (props: Props): void => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const nodeUpdateEvent = Sockets.getNodeValidationsUpdateEvent(props)

    const listener = (args: [WebsocketResponse]): void => {
      const [{ validations, ...rest }] = args
      dispatch(AssessmentSectionActions.setNodeValidations({ ...rest, validations }))
    }

    SocketClient.on(nodeUpdateEvent, listener)
    return () => {
      SocketClient.off(nodeUpdateEvent, listener)
    }
  }, [dispatch, props])
}
