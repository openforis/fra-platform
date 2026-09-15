import { CountryIso } from 'meta/area/countryIso'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'
import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { BaseProtocol } from 'server/db/db'
import { Logger } from 'server/utils/logger'

type Props = CloneProps & {
  countryISOs?: Array<CountryIso>
}

export const cloneValidations = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycleTarget

  let { countryISOs } = props
  if (!countryISOs) {
    const countries = await AreaRedisRepository.getManyCountries({ assessment, cycle: cycleTarget }, client)
    countryISOs = countries.map<CountryIso>((country) => country.countryIso)
  }

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const propsCopy = { assessment, countryIso, cycleSource, cycleTarget }
      await TableValidationRedisRepository.copyValidations(propsCopy)
      await DescriptionValidationRedisRepository.copyValidations(propsCopy)
      await NationalDataPointValidationRedisRepository.copyValidations(propsCopy)
    })
  )
  Logger.info(`${assessmentName}-${cycleName}: Validations cloned in redis`)
}
