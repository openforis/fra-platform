import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'

export const getOriginalDataPointReservedYears = async (
  props: { assessment: Assessment; cycle: Cycle; countryIso: CountryIso },
  client: BaseProtocol = DB
): Promise<Array<number>> => {
  const { assessment, cycle, countryIso } = props

  return OriginalDataPointRepository.getReservedYears({ assessment, cycle, countryIso }, client)
}
