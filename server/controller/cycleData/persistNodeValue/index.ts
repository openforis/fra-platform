import { DB } from '@server/db'

import { persistNode } from './persistNode/persistNode'
import { persistCalculationDependants } from './persistCalculationDependants'
import { Props } from './props'
// import { validateNode } from './validateNode'

export const persistNodeValue = async (props: Props): Promise<void> => {
  return DB.tx(async (client) => {
    await persistNode(props, client)
    await persistCalculationDependants(props, client)
    // await validateNode(props, client)
  })
}
