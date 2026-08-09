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
  cycle: Cycle
}

export const removeValidationsCache = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const countries = await CountryRepository.getMany({ assessment, cycle }, client)
  const countryISOs = countries.map<CountryIso>((country) => country.countryIso)

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      await TableValidationRedisRepository.removeValidations({ assessment, countryIso, cycle })
      await DescriptionValidationRedisRepository.removeValidations({ assessment, countryIso, cycle })
      await NationalDataPointValidationRedisRepository.removeValidations({ assessment, countryIso, cycle })
    })
  )
  Logger.info(`${assessmentName}-${cycleName}: Validations removed from redis`)
}
