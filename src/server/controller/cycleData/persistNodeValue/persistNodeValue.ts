import { ActivityLogMessage } from '@meta/assessment'

// import { NodeUpdates } from '@meta/data'
import { BaseProtocol } from '@server/db'

// import { DB } from '@server/db'
import { persistNode } from './persistNode/persistNode'
// import { calculateAndValidateDependentNodes } from './calculateAndValidateDependentNodes'
import { Props } from './props'

export const persistNodeValue = async (
  props: Props & { activityLogMessage?: ActivityLogMessage },
  client: BaseProtocol
): Promise<void> => {
  // const { assessment, colName, countryIso, cycle, tableName, variableName } = props

  // return DB.tx(async (client) => {
  // try {
  // await client.func('pg_advisory_xact_lock', [1])

  // const node =
  await persistNode(props, client)

  // const nodeUpdates: NodeUpdates = {
  //   assessment,
  //   countryIso,
  //   cycle,
  //   nodes: [{ tableName, variableName, colName, value: node.value }],
  // }

  // await calculateAndValidateDependentNodes({ ...props, nodeUpdates }, client)
  // } finally {
  // await client.func('pg_advisory_xact_lock', [1])
  // }
  // })
}
