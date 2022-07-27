import { Sockets } from '@meta/socket'

import { DB } from '@server/db'
import { SocketServer } from '@server/service/socket'

import { persistNode } from './persistNode/persistNode'
import { calculateDependantNodes } from './calculateDependantNodes'
import { Props } from './props'
import { validateNodeUpdates } from './validateNodeUpdates'

export const persistNodeValue = async (props: Props): Promise<void> => {
  const { tableName, variableName, colName } = props

  return DB.tx(async (client) => {
    const node = await persistNode(props, client)

    const nodeUpdates = await calculateDependantNodes(props, client)
    nodeUpdates.nodes.unshift({ tableName, variableName, colName, value: node.value })

    const nodeUpdatesValidation = await validateNodeUpdates({ nodeUpdates }, client)

    const { assessment, cycle, countryIso, nodes } = nodeUpdatesValidation
    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    nodes.forEach((nodeUpdate) => {
      const { tableName, variableName, colName, value } = nodeUpdate
      const propsEvent = { countryIso, assessmentName, cycleName, tableName, variableName, colName }
      const nodeUpdateEvent = Sockets.getNodeUpdateEvent(propsEvent)
      SocketServer.emit(nodeUpdateEvent, { value })
    })
  })
}
