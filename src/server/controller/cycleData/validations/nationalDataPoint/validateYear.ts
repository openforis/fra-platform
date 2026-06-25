import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NationalDataPointValidator } from 'meta/assessment/validation/nationalDataPointValidator/nationalDataPointValidator'

import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  nationalDataPoint: OriginalDataPoint
}

export const validateYear = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, nationalDataPoint } = props
  const { uuid } = nationalDataPoint

  const validations = await NationalDataPointValidationRedisRepository.getValidations({
    assessment,
    countryIso,
    cycle,
  })

  const validation = NationalDataPointValidator.validateYear({
    nationalDataPoint,
    validation: validations[uuid] ?? {},
  })

  await NationalDataPointValidationRedisRepository.setValidations({
    assessment,
    countryIso,
    cycle,
    validations: { [uuid]: validation },
  })
  // TODO: Notify clients.
}
