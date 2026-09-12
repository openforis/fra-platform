import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { NationalDataPointValidator } from 'meta/assessment/validation/nationalDataPointValidator/nationalDataPointValidator'

import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'

import { notifyNationalDataPointValidationUpdate } from './notifyNationalDataPointValidationUpdate'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  nationalDataPoint: OriginalDataPoint
}

export const validateNDPNationalClasses = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, nationalDataPoint } = props
  const { id, uuid } = nationalDataPoint

  const validation = NationalDataPointValidator.validateNationalClasses({ nationalDataPoint })

  // Merge the national class validations onto the stored record, so the other field validations are kept.
  const current = await NationalDataPointValidationRedisRepository.getValidation({
    assessment,
    countryIso,
    cycle,
    uuid,
  })
  const updated: NDPValidation = { ...current, odpId: id }
  if (validation) updated.nationalClasses = validation
  else delete updated.nationalClasses

  const validations = { [uuid]: updated }
  await NationalDataPointValidationRedisRepository.setValidations({ assessment, countryIso, cycle, validations })

  notifyNationalDataPointValidationUpdate({ assessment, countryIso, cycle, validations })
}
