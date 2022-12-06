import { ActivityLogMessage } from '@meta/assessment'
import { NodeUpdates } from '@meta/data'
import { User } from '@meta/user'

import { DB } from '@server/db'

import { persistNodeValue } from './persistNodeValue'

interface Props {
  nodeUpdates: NodeUpdates
  user: User
  sectionName: string
}

// Wrapper to support persisting full tables
export const persistNodeValues = async (props: Props & { activityLogMessage?: ActivityLogMessage }): Promise<void> => {
  const { user, nodeUpdates, activityLogMessage, sectionName } = props
  const { assessment, cycle, countryIso, nodes } = nodeUpdates

  await DB.tx(async (client) => {
    try {
      await client.func('pg_advisory_xact_lock', [1])

      await Promise.all(
        nodes.map((nodeUpdate) => {
          const { tableName, variableName, colName, value } = nodeUpdate
          return persistNodeValue(
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
        })
      )
    } finally {
      await client.func('pg_advisory_xact_lock', [1])
    }
  })
}
