import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'
import { BaseProtocol, DB } from 'server/db/db'
import { CountryRepository } from 'server/db/repository/assessmentCycle/country'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
}

export const renameValidations = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycleTarget

  const countries = await CountryRepository.getMany({ assessment, cycle: cycleTarget }, client)
  const countryISOs = countries.map<CountryIso>((country) => country.countryIso)

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const propsRename = { assessment, countryIso, cycleSource, cycleTarget }
      await TableValidationRedisRepository.renameValidations(propsRename)
      await DescriptionValidationRedisRepository.renameValidations(propsRename)
      await NationalDataPointValidationRedisRepository.renameValidations(propsRename)
    })
  )
  Logger.info(`${assessmentName}-${cycleName}: Validations renamed from redis`)
}
