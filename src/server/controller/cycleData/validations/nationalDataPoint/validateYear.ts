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

  const nationalDataPointValidations = await NationalDataPointValidationRedisRepository.getValidations({
    assessment,
    countryIso,
    cycle,
  })

  const validation = NationalDataPointValidator.validateYear({
    nationalDataPoint,
    validation: nationalDataPointValidations[uuid] ?? {},
  })

  await NationalDataPointValidationRedisRepository.setValidations({
    assessment,
    countryIso,
    cycle,
    nationalDataPointValidations: { [uuid]: validation },
  })
  // TODO: Notify clients.
}
