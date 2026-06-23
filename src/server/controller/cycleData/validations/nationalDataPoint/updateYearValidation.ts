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

export const updateYearValidation = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, nationalDataPoint } = props
  const yearValidation = NationalDataPointValidator.validateYear({ nationalDataPoint })
  const { uuid } = nationalDataPoint

  await NationalDataPointValidationRedisRepository.updateValidations({
    assessment,
    countryIso,
    cycle,
    nationalDataPointValidations: { [uuid]: { year: yearValidation } },
  })
  // TODO: Notify clients.
}
