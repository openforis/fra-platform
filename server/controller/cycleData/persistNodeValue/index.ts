import { DB } from '@server/db'

import { persistNode } from './persistNode/persistNode'
import { persistCalculationDependants } from './persistCalculationDependants'
import { Props } from './props'
import { validateNodeUpdates } from './validateNodeUpdates'

export const persistNodeValue = async (props: Props): Promise<void> => {
  const { tableName, variableName, colName } = props

  return DB.tx(async (client) => {
    const node = await persistNode(props, client)

    const nodeUpdates = await persistCalculationDependants(props, client)
    nodeUpdates.values.unshift({ tableName, variableName, colName, value: node.value })

    await validateNodeUpdates({ nodeUpdates }, client)
  })
}
