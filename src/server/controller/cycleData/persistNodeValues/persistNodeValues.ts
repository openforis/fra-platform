import { Country } from 'meta/area'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeUpdate, NodeUpdates } from 'meta/data'
import { Sockets } from 'meta/socket'
import { User } from 'meta/user'

import { resetMirrorNodes } from 'server/controller/cycleData/resetMirrorNodes'
import { scheduleUpdateDependencies } from 'server/controller/cycleData/updateDependencies'
import { BaseProtocol, DB } from 'server/db'
import { CountryService } from 'server/service/country'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'

import { persistNode } from './persistNode'

type Props = {
  assessment: Assessment
  cycle: Cycle
  activityLogMessage?: ActivityLogMessage
  nodeUpdates: NodeUpdates
  sectionName: string
  user: User
  country: Country
}

export const persistNodeValues = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, user, nodeUpdates, activityLogMessage, sectionName, country } = props
  const { countryIso } = nodeUpdates

  await client.tx(async (client) => {
    try {
      await client.func('pg_advisory_xact_lock', [1])

      // update nodes in db
      const persistedNodes = await Promise.all<NodeUpdate>(
        nodeUpdates.nodes.map(async (nodeUpdate) => {
          const { tableName, variableName, colName, value } = nodeUpdate

          const propsPersist = {
            assessment,
            cycle,
            countryIso,
            sectionName,
            tableName,
            variableName,
            colName,
            value,
            user,
            activityLogMessage,
          }
          const node = await persistNode(propsPersist, client)
          return { tableName, variableName, colName, value: node.value }
        })
      )

      // notify updates to client
      const assessmentName = assessment.props.name
      const cycleName = cycle.name
      const propsEvent = { countryIso, assessmentName, cycleName }
      const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)
      const nodeUpdatesPersisted: NodeUpdates = { assessmentName, cycleName, countryIso, nodes: persistedNodes }
      const nodeUpdatesMirrorReset = await resetMirrorNodes(
        { assessment, cycle, nodeUpdates: nodeUpdatesPersisted },
        client
      )
      SocketServer.emit(nodeUpdateEvent, { nodeUpdates: nodeUpdatesMirrorReset })
      await CountryService.updateLastEdit({ assessment, cycle, country, user }, client)

      // schedule dependencies update
      await scheduleUpdateDependencies({ assessment, cycle, nodeUpdates: nodeUpdatesPersisted, user })
    } catch (error) {
      Logger.error(error)
      throw error
    } finally {
      await client.func('pg_advisory_xact_lock', [1])
    }
  })
}
