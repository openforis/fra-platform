import { Objects } from '@utils/objects'

import { NodeUpdates } from '@meta/data'
import { Sockets } from '@meta/socket'

import { BaseProtocol } from '@server/db'
import { SocketServer } from '@server/service/socket'

import { calculateDependantNodes } from './calculateDependantNodes'
import { Props } from './props'
import { validateNodeUpdates } from './validateNodeUpdates'

export const calculateAndValidateDependentNodes = async (
  props: Omit<Props, 'value'> & { nodeUpdates: NodeUpdates },
  client: BaseProtocol
): Promise<void> => {
  const nodeUpdates = await calculateDependantNodes(props, client)
  nodeUpdates.nodes.unshift(...props.nodeUpdates.nodes)

  const validations = await validateNodeUpdates({ nodeUpdates }, client)

  // Update node values
  const { countryIso, assessment, cycle } = nodeUpdates
  nodeUpdates.nodes.forEach((nodeUpdate) => {
    const { tableName, variableName, colName, value } = nodeUpdate
    const propsEvent = {
      countryIso,
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
      tableName,
      variableName,
      colName,
    }
    const nodeUpdateEvent = Sockets.getNodeUpdateEvent(propsEvent)
    SocketServer.emit(nodeUpdateEvent, { value })
  })

  const propsEvent = {
    countryIso,
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    sectionName: props.sectionName,
  }

  // Update validations
  if (!Objects.isEmpty(validations.nodes)) {
    const nodeValidationsUpdateEvent = Sockets.getAssessmentSectionValidationsUpdateEvent(propsEvent)
    SocketServer.emit(nodeValidationsUpdateEvent, {
      ...propsEvent,
      validations: validations.nodes,
    })
  }
}
