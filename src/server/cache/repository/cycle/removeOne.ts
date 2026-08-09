import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { removeDataCache } from 'server/cache/repository/cycle/removeDataCache'
import { removeMetadataCache } from 'server/cache/repository/cycle/removeMetadataCache'
import { removeValidationsCache } from 'server/cache/repository/cycle/removeValidationsCache'
import { MetaCacheRedisRepository } from 'server/cache/repository/metaCache'
import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const removeOne = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props

  await MetaCacheRedisRepository.removeMetaCache({ assessment, cycle })
  await removeMetadataCache({ assessment, cycle }, client)
  await removeDataCache({ assessment, cycle }, client)
  await removeValidationsCache({ assessment, cycle }, client)
  await AreaRedisRepository.removeAreas({ assessment, cycle })
}
