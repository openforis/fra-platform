import { ActivityLogMessage } from '@meta/assessment'
import { NodeUpdate } from '@meta/data'

import { scheduleUpdateDependencies } from '@server/controller/cycleData/updateDependencies'
import { DB } from '@server/db'
import { Logger } from '@server/utils/logger'

import { persistNode } from './persistNode'
import { PersistNodeValuesProps } from './props'

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
      await scheduleUpdateDependencies({
        nodeUpdates: { assessment, cycle, countryIso, nodes: persistedNodes },
        sectionName,
        user,
      })
    } catch (error) {
      Logger.error(error)
      throw error
    } finally {
      await client.func('pg_advisory_xact_lock', [1])
    }
  })
}
