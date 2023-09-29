import { ActivityLogMessage } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'
import { Sockets } from 'meta/socket'
import { User } from 'meta/user'

import { resetMirrorNodes } from 'server/controller/cycleData/resetMirrorNodes'
import { scheduleUpdateDependencies } from 'server/controller/cycleData/updateDependencies'
import { BaseProtocol, DB } from 'server/db'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'

import { persistNode } from './persistNode'

type Props = {
  activityLogMessage?: ActivityLogMessage
  nodeUpdates: NodeUpdates
  sectionName: string
  user: User
}

export const persistNodeValues = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { user, nodeUpdates, activityLogMessage, sectionName } = props
  const { assessment, cycle, countryIso } = nodeUpdates

  await client.tx(async (client) => {
    try {
      await client.func('pg_advisory_xact_lock', [1])

      // update nodes in db
      const persistedNodes = await Promise.all<NodeUpdate>(
        nodeUpdates.nodes.map(async (nodeUpdate) => {
          const { tableName, variableName, colName, value } = nodeUpdate
          const node = await persistNode(
            {
              user,
              assessment,
              cycle,
              countryIso,
              tableName,
              variableName,
              colName,
              value,
              activityLogMessage,
              sectionName,
            },
            client
          )
          return { tableName, variableName, colName, value: node.value }
        })
      )

      // notify updates to client
      const propsEvent = { countryIso, assessmentName: assessment.props.name, cycleName: cycle.name }
      const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)
      const nodeUpdatesPersisted = { assessment, cycle, countryIso, nodes: persistedNodes }
      const nodeUpdatesMirrorReset = await resetMirrorNodes({ nodeUpdates: nodeUpdatesPersisted }, client)
      SocketServer.emit(nodeUpdateEvent, { nodeUpdates: nodeUpdatesMirrorReset })

      // schedule dependencies update
      await scheduleUpdateDependencies({ nodeUpdates: nodeUpdatesPersisted, user })
    } catch (error) {
      Logger.error(error)
      throw error
    } finally {
      await client.func('pg_advisory_xact_lock', [1])
    }
  })
}
