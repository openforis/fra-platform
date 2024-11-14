import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { DataRedisRepository } from 'server/repository/redis/data'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const removeDataCache = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const countries = await CountryRepository.getMany({ assessment, cycle }, client)
  const countryISOs = countries.map((c) => c.countryIso)

  await DataRedisRepository.removeCountriesData({ assessment, cycle, countryISOs })
  Logger.info(`${assessmentName}-${cycleName}: Data removed from redis`)
}
