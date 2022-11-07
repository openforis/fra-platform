import { NodeUpdates } from '@meta/data'
import { Sockets } from '@meta/socket'

import { BaseProtocol } from '@server/db'
import { SocketServer } from '@server/service/socket'

import { calculateDependantNodes } from './calculateDependantNodes'
import { Props } from './props'
import { validateNodeUpdates } from './validateNodeUpdates'

export const calculateAndValidateDependentNodes = async (
  props: Props & { nodeUpdates: NodeUpdates },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, countryIso, cycle } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const nodeUpdates = await calculateDependantNodes(props, client)
  nodeUpdates.nodes.unshift(...props.nodeUpdates.nodes)

  const nodeUpdatesValidation = await validateNodeUpdates({ nodeUpdates }, client)

  nodeUpdatesValidation.nodes.forEach((nodeUpdate) => {
    const { tableName, variableName, colName, value } = nodeUpdate
    const propsEvent = { countryIso, assessmentName, cycleName, tableName, variableName, colName }
    const nodeUpdateEvent = Sockets.getNodeUpdateEvent(propsEvent)
    SocketServer.emit(nodeUpdateEvent, { value })
  })
}
