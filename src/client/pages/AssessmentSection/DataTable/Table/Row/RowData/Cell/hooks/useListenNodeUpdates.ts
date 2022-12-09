import { useEffect } from 'react'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { NodeUpdates } from '@meta/data'
import { Sockets } from '@meta/socket'

import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { SocketClient } from '@client/service/socket'

type Props = {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
  tableName: string
}

export const useListenNodeUpdates = (props: Props): void => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const { countryIso } = props
    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(props)

    const listener = (args: [{ nodeUpdates: NodeUpdates }]): void => {
      const [{ nodeUpdates }] = args
      dispatch(AssessmentSectionActions.setNodeValues({ countryIso, nodeUpdates }))
    }

    SocketClient.on(nodeUpdateEvent, listener)
    return () => {
      SocketClient.off(nodeUpdateEvent, listener)
    }
  }, [dispatch, props])
}
