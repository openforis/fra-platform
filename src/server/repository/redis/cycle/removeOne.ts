import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db'
import { removeDataCache } from 'server/repository/redis/cycle/removeDataCache'
import { removeMetadataCache } from 'server/repository/redis/cycle/removeMetadataCache'
import { MetaCacheRedisRepository } from 'server/repository/redis/metaCache'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const removeOne = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props

  await MetaCacheRedisRepository.removeMetaCache({ assessment, cycle })
  await removeMetadataCache({ assessment, cycle }, client)
  await removeDataCache({ assessment, cycle }, client)
}
