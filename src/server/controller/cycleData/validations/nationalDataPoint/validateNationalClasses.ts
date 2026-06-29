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

export const validateNationalClasses = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, nationalDataPoint } = props
  const { uuid } = nationalDataPoint

  const validation = await NationalDataPointValidationRedisRepository.getValidation({
    assessment,
    countryIso,
    cycle,
    uuid,
  })

  const updatedValidation = NationalDataPointValidator.validateNationalClasses({
    nationalDataPoint,
    validation,
  })

  await NationalDataPointValidationRedisRepository.setValidations({
    assessment,
    countryIso,
    cycle,
    validations: { [uuid]: updatedValidation },
  })
  // TODO: Notify clients.
}
