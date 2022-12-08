import { Objects } from '@utils/objects'

import { NodeUpdate } from '@meta/data'
import { Sockets } from '@meta/socket'

import { BaseProtocol } from '@server/db'
import { SocketServer } from '@server/service/socket'

import { calculateDependantNodes } from './calculateDependantNodes'
import { PersistNodeValueProps } from './props'
import { validateNodeUpdates } from './validateNodeUpdates'

export const calculateAndValidateDependentNodes = async (
  props: Omit<PersistNodeValueProps, 'value'> & { sourceNode?: NodeUpdate; isODP?: boolean },
  client: BaseProtocol
): Promise<void> => {
  const { isODP, sectionName, sourceNode } = props

  const nodeUpdates = await calculateDependantNodes(props, client)
  if (sourceNode) nodeUpdates.nodes.unshift(sourceNode)

  const validations = await validateNodeUpdates({ nodeUpdates, isODP }, client)

  // Update node values
  const { countryIso, assessment, cycle } = nodeUpdates

  const propsEvent = {
    countryIso,
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
  }

  nodeUpdates.nodes.forEach((nodeUpdate) => {
    const { tableName, variableName, colName, value } = nodeUpdate
    const nodeUpdateEvent = Sockets.getNodeValueUpdateEvent({ ...propsEvent, tableName, variableName, colName })
    SocketServer.emit(nodeUpdateEvent, { value })
  })

  // Update validations
  if (!Objects.isEmpty(validations.nodes)) {
    const nodeValidationsUpdateEvent = Sockets.getNodeValidationsUpdateEvent({ ...propsEvent, sectionName })
    SocketServer.emit(nodeValidationsUpdateEvent, {
      ...propsEvent,
      validations: validations.nodes,
    })
  }
}
