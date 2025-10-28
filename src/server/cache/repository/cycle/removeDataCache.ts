import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db'
import { DataRedisRepository } from 'server/cache/repository/data'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
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
