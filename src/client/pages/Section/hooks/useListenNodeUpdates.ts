import { useEffect } from 'react'

import { AreaCode } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { NodeUpdates } from 'meta/data'
import { Sockets } from 'meta/socket'

import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import { useAppDispatch } from 'client/store/hooks'
import { SocketClient } from 'client/service/socket/client'

type Props = {
  countryIso: AreaCode
  assessmentName: AssessmentName
  cycleName: string
}

export const useListenNodeUpdates = (props: Props): void => {
  const dispatch = useAppDispatch()
  const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(props)

  useEffect(() => {
    const listener = (args: [{ nodeUpdates: NodeUpdates }]): void => {
      const [{ nodeUpdates }] = args
      dispatch(NodeValuesActions.setNodeValues({ nodeUpdates }))
    }

    SocketClient.on(nodeUpdateEvent, listener)
    return () => {
      SocketClient.off(nodeUpdateEvent, listener)
    }
  }, [dispatch, nodeUpdateEvent])
}
