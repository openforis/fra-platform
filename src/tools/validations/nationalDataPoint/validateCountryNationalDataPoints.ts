import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { NationalDataPointValidator } from 'meta/assessment/validation/nationalDataPointValidator/nationalDataPointValidator'

import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { BaseProtocol } from 'server/db/db'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { DataValidationService } from 'server/service/dataValidation'

import { CountryProps } from '../common/validateCountries'

export const validateCountryNationalDataPoints = async (props: CountryProps, client: BaseProtocol): Promise<void> => {
  const { assessment, country, cycle } = props
  const { countryIso } = country

  const nationalDataPoints = await OriginalDataPointRepository.getMany(
    { assessment, countryISOs: [countryIso], cycle },
    client
  )

  await DataValidationService.removeNDPValidations({ assessment, countryIso, cycle })

  const validations: RecordNDPValidations = {}
  nationalDataPoints.forEach((nationalDataPoint) => {
    const { uuid } = nationalDataPoint
    validations[uuid] = NationalDataPointValidator.validate({ nationalDataPoint })
  })

  await NationalDataPointValidationRedisRepository.setValidations({ assessment, countryIso, cycle, validations })
}
