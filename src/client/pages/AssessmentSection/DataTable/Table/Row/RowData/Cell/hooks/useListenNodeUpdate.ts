import { useEffect } from 'react'

import { CountryIso } from '@meta/area'
import { AssessmentName, NodeValue } from '@meta/assessment'
import { NodeUpdate } from '@meta/data'
import { Sockets } from '@meta/socket'

import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { SocketClient } from '@client/service/socket'

type Props = {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
  tableName: string
  variableName: string
  colName: string
}

export const useListenNodeUpdate = (props: Props): void => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const { countryIso, tableName, variableName, colName } = props
    const nodeUpdateEvent = Sockets.getNodeValueUpdateEvent(props)

    const listener = (args: [{ value: NodeValue }]): void => {
      const [{ value }] = args
      const nodeUpdate: NodeUpdate = { tableName, variableName, colName, value }
      dispatch(AssessmentSectionActions.setNodeValue({ countryIso, nodeUpdate }))
    }

    SocketClient.on(nodeUpdateEvent, listener)
    return () => {
      SocketClient.off(nodeUpdateEvent, listener)
    }
  }, [dispatch, props])
}
