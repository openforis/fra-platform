import { PropsMerge } from 'tools/cycles/merge/_types'

import { CacheController } from 'server/cache/controller'
import { BaseProtocol } from 'server/db/db'

export const updateCache = async (props: PropsMerge, client: BaseProtocol): Promise<void> => {
  const { assessment, cycleTo: cycle } = props

  await CacheController.generateData({ assessment, cycle }, client)
}
