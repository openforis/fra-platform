import { NodeUpdates } from '@meta/data'
import { User } from '@meta/user'

import { persistNodeValue } from './persistNodeValue'

interface Props {
  nodes: NodeUpdates
  user: User
}

// Wrapper to support persisting full tables
export const persistNodeValues = async (props: Props): Promise<void> => {
  const { user, nodes } = props
  const { assessment, cycle, countryIso, values } = nodes

  await Promise.all(
    values.map((nodeUpdate) => {
      const { tableName, variableName, colName, value } = nodeUpdate
      return persistNodeValue({ user, assessment, cycle, countryIso, tableName, variableName, colName, value })
    })
  )
}
