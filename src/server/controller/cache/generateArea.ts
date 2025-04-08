import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db'
import { AreaRedisRepository } from 'server/repository/redis/area'
import { Logger } from 'server/utils/logger'

type Props = { assessment: Assessment; cycle: Cycle }

export const generateArea = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment, cycle } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const regionGroups = await AreaRedisRepository.getManyRegionGroups({ assessment, cycle, force: true }, client)
  const countries = await AreaRedisRepository.getManyCountries({ assessment, cycle, force: true }, client)

  Logger.info(`${assessmentName}-${cycleName}: "${Object.keys(regionGroups).length} region groups" generated`)
  Logger.info(`${assessmentName}-${cycleName}: "${Object.keys(countries).length} countries" generated`)
}
