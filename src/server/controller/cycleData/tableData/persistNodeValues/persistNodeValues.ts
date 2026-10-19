import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeUpdate, NodeUpdates } from 'meta/data/nodeUpdates'
import { Sockets } from 'meta/socket/sockets'
import { User } from 'meta/user/user'

import { persistNode } from 'server/controller/cycleData/tableData/persistNodeValues/persistNode'
import { resetMirrorNodes } from 'server/controller/cycleData/tableData/resetMirrorNodes'
import { updateDependents } from 'server/controller/cycleData/tableData/updateDependencies/updateDependents'
import { BaseProtocol, DB } from 'server/db/db'
import { CountryService } from 'server/service/country'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
  activityLogMessage?: ActivityLogMessage
  nodeUpdates: NodeUpdates
  sectionName: string
  user: User
  country: Country
}

type PersistedNodeWithTime = NodeUpdate & {
  time: string
}

export const persistNodeValues = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { activityLogMessage, assessment, country, cycle, nodeUpdates, sectionName, user } = props
  const { countryIso } = nodeUpdates

  await client.tx(async (client) => {
    try {
      await client.func('pg_advisory_xact_lock', [1])

      // update nodes in db
      const persistedNodesWithTimes: Array<PersistedNodeWithTime> = await Promise.all(
        nodeUpdates.nodes.map(async (nodeUpdate) => {
          const { colName, tableName, value, variableName } = nodeUpdate

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
          const { node, time } = await persistNode(propsPersist, client)
          return { tableName, variableName, colName, value: node.value, time }
        })
      )

      const persistedNodes = persistedNodesWithTimes.map(({ colName, tableName, value, variableName }) => ({
        tableName,
        variableName,
        colName,
        value,
      }))

      const lastUpdateTimestamp = persistedNodesWithTimes.reduce<string>(
        (max: string, { time }: { time: string }) => (time > max ? time : max),
        ''
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
      await CountryService.updateLastEdit({ assessment, cycle, country, user, lastUpdateTimestamp }, client)

      // schedule dependencies update
      await updateDependents({ assessment, cycle, country, nodeUpdates: nodeUpdatesPersisted, user }, client)
    } catch (error) {
      Logger.error(error)
      throw error
    } finally {
      await client.func('pg_advisory_xact_lock', [1])
    }
  })
}
