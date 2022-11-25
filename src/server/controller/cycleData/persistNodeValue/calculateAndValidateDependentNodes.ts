import { NodeUpdates } from '@meta/data'

import { BaseProtocol } from '@server/db'

import { calculateDependantNodes } from './calculateDependantNodes'
import { Props } from './props'
import { validateNodeUpdates } from './validateNodeUpdates'

export const calculateAndValidateDependentNodes = async (
  props: Omit<Props, 'value'> & { nodeUpdates: NodeUpdates },
  client: BaseProtocol
): Promise<{ nodeUpdatesValidation: any; nodeUpdates: any }> => {
  const nodeUpdates = await calculateDependantNodes(props, client)
  nodeUpdates.nodes.unshift(...props.nodeUpdates.nodes)

  const nodeUpdatesValidation = await validateNodeUpdates({ nodeUpdates }, client)

  // TODO Remove
  // nodeUpdatesValidation.nodes.forEach((nodeUpdate) => {
  //   const { tableName, variableName, colName, value } = nodeUpdate
  //   const propsEvent = { countryIso, assessmentName, cycleName, tableName, variableName, colName }
  //   const nodeUpdateEvent = Sockets.getNodeUpdateEvent(propsEvent)
  //   SocketServer.emit(nodeUpdateEvent, { value })
  // })

  return {
    nodeUpdatesValidation,
    nodeUpdates,
  }
}
