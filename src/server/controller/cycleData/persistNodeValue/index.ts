import { ActivityLogMessage } from '@meta/assessment'

import { handleWebsocket } from '@server/controller/cycleData/handleWebsocket'
import { DB } from '@server/db'

import { persistNode } from './persistNode/persistNode'
import { calculateDependantNodes } from './calculateDependantNodes'
import { Props } from './props'
import { validateNodeUpdates } from './validateNodeUpdates'

export const persistNodeValue = async (props: Props & { activityLogMessage?: ActivityLogMessage }): Promise<void> => {
  const { tableName, variableName, colName } = props

  return DB.tx(async (client) => {
    const node = await persistNode(props, client)

    const nodeUpdates = await calculateDependantNodes(props, client)
    nodeUpdates.nodes.unshift({ tableName, variableName, colName, value: node.value })

    const nodeUpdatesValidation = await validateNodeUpdates({ nodeUpdates }, client)

    handleWebsocket(nodeUpdatesValidation)
  })
}
