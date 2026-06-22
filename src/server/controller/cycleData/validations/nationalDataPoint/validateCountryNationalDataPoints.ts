import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'

import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'

import { validateNationalDataPoint } from './validateNationalDataPoint'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
}

export const validateCountryNationalDataPoints = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<RecordNDPValidations> => {
  const { assessment, country, cycle } = props
  const { countryIso } = country

  const nationalDataPoints = await OriginalDataPointRepository.getMany({ assessment, countryIso, cycle }, client)

  const nationalDataPointValidations = nationalDataPoints.reduce<RecordNDPValidations>((acc, nationalDataPoint) => {
    acc[nationalDataPoint.uuid] = validateNationalDataPoint({ nationalDataPoint })
    return acc
  }, {})

  await NationalDataPointValidationRedisRepository.setNationalDataPointValidations({
    assessment,
    countryIso,
    cycle,
    nationalDataPointValidations,
  })

  return nationalDataPointValidations
}
