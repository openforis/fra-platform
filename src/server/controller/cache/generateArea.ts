import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { AreaRedisRepository } from 'server/repository/redis/area'

type Props = { assessment: Assessment; cycle: Cycle }

export const generateArea = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment, cycle } = props
  await AreaRedisRepository.getManyRegionGroups({ assessment, cycle, force: true }, client)
  await AreaRedisRepository.getManyCountries({ assessment, cycle, force: true }, client)
}
