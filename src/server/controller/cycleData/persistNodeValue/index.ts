import { ActivityLogMessage } from '@meta/assessment'
import { NodeUpdates } from '@meta/data'

import { calculateAndValidateDependentNodes } from '@server/controller/cycleData/persistNodeValue/calculateAndValidateDependentNodes'
import { DB } from '@server/db'

import { persistNode } from './persistNode/persistNode'
import { Props } from './props'

export const persistNodeValue = async (props: Props & { activityLogMessage?: ActivityLogMessage }): Promise<void> => {
  const { assessment, colName, countryIso, cycle, tableName, variableName } = props

  return DB.tx(async (client) => {
    const node = await persistNode(props, client)

    const nodeUpdates: NodeUpdates = {
      assessment,
      countryIso,
      cycle,
      nodes: [{ tableName, variableName, colName, value: node.value }],
    }
    await calculateAndValidateDependentNodes({ ...props, nodeUpdates }, client)
  })
}
