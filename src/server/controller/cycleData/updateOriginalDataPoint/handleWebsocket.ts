import { NodeUpdate, NodeUpdates } from '@meta/data'
import { Sockets } from '@meta/socket'

import { SocketServer } from '@server/service/socket'

export const handleWebsocket = (nodeUpdatesValidation: NodeUpdates) => {
  const { assessment, cycle, countryIso, nodes } = nodeUpdatesValidation
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  nodes.forEach((nodeUpdate: NodeUpdate) => {
    const { tableName, variableName, colName, value } = nodeUpdate
    const propsEvent = { countryIso, assessmentName, cycleName, tableName, variableName, colName }
    const nodeUpdateEvent = Sockets.getNodeUpdateEvent(propsEvent)
    SocketServer.emit(nodeUpdateEvent, { value })
  })
}
