import { DB } from '@server/db'

import { createOrUpdateNode } from './createOrUpdateNode'
import { evaluateCalculationDependants } from './evaluateCalculationDependants'
import { Props } from './props'

export const persistNodeValue = async (props: Props): Promise<void> => {
  return DB.tx(async (client) => {
    await createOrUpdateNode(props, client)
    await evaluateCalculationDependants(props, client)
  })
}
