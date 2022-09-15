import { ActivityLogMessage } from '@meta/assessment'
import { NodeUpdates } from '@meta/data'
import { User } from '@meta/user'

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

  await Promise.all(
    nodes.map((nodeUpdate) => {
      const { tableName, variableName, colName, value } = nodeUpdate
      return persistNodeValue({
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
      })
    })
  )
}
