import { useEffect } from 'react'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { NodeUpdates } from '@meta/data'
import { Sockets } from '@meta/socket'

import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions } from '@client/store/ui/assessmentSection'
import { SocketClient } from '@client/service/socket'

type Props = {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
}

export const useListenNodeUpdates = (props: Props): void => {
  const dispatch = useAppDispatch()
  const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(props)

  useEffect(() => {
    const listener = (args: [{ nodeUpdates: NodeUpdates }]): void => {
      const [{ nodeUpdates }] = args
      dispatch(AssessmentSectionActions.setNodeValues({ nodeUpdates }))
    }

    SocketClient.on(nodeUpdateEvent, listener)
    return () => {
      SocketClient.off(nodeUpdateEvent, listener)
    }
  }, [dispatch, nodeUpdateEvent])
}
