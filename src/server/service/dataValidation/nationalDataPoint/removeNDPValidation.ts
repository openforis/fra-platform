import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { UUID } from 'meta/uuid/uuid'

import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'

import { notifyNationalDataPointValidationDelete } from './notifyNationalDataPointValidationDelete'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  uuid: UUID
}

export const removeNDPValidation = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, uuid } = props

  await NationalDataPointValidationRedisRepository.deleteValidations({
    assessment,
    countryIso,
    cycle,
    uuids: [uuid],
  })

  notifyNationalDataPointValidationDelete({ assessment, countryIso, cycle, uuid })
}
