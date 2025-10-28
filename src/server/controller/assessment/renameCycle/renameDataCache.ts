import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { CountryRepository } from 'server/db/repository/assessmentCycle/country'
import { DataRedisRepository } from 'server/cache/repository/data'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
}

export const renameDataCache = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycleTarget

  const countries = await CountryRepository.getMany({ assessment, cycle: cycleTarget }, client)
  const countryISOs = countries.map((c) => c.countryIso)

  await DataRedisRepository.renameCountriesData({ assessment, countryISOs, cycleSource, cycleTarget })
  Logger.info(`${assessmentName}-${cycleName}: Data renamed from redis`)
}
