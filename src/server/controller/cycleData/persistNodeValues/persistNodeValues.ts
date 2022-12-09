import { ActivityLogMessage } from '@meta/assessment'
import { NodeUpdate } from '@meta/data'

import { PersistNodeValuesProps } from '@server/controller/cycleData/persistNodeValues/props'
import { QueueFactory } from '@server/controller/cycleData/persistNodeValues/queueFactory'
import { DB } from '@server/db'

import { persistNode } from './persistNode'

export const persistNodeValues = async (
  props: PersistNodeValuesProps & { activityLogMessage?: ActivityLogMessage }
): Promise<void> => {
  const { user, nodeUpdates, activityLogMessage, sectionName } = props
  const { assessment, cycle, countryIso } = nodeUpdates

  await DB.tx(async (client) => {
    try {
      await client.func('pg_advisory_xact_lock', [1])

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
      await QueueFactory.getInstance({ assessment, cycle, countryIso }).add(
        {
          nodeUpdates: { assessment, cycle, countryIso, nodes: persistedNodes },
          sectionName,
          user,
        },
        { removeOnComplete: true }
      )

      // console.log('==== UPDATED ', persistedNodes.length, 'nodes')
    } catch (error) {
      console.log('====== error ', error)
    } finally {
      await client.func('pg_advisory_xact_lock', [1])
    }
  })
}
