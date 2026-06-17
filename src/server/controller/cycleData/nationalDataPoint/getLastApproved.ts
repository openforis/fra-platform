import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { HistoryLastApprovedInfo } from 'meta/cycleData/history/lastApproved'
import { Objects } from 'utils/objects'

import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  info: HistoryLastApprovedInfo
  year: string
}

export const getLastApproved = async (props: Props): Promise<OriginalDataPoint | undefined> => {
  const { assessment, countryIso, cycle, info, year } = props

  let odp: OriginalDataPoint
  if (!Objects.isNil(info.lastAccepted)) {
    odp = await OriginalDataPointRepository.getLastAccepted({ assessment, cycle, countryIso, year })
  }
  if (!Objects.isNil(info.prevCycle) && Objects.isNil(odp)) {
    odp = await OriginalDataPointRepository.getOne({ assessment, cycle: info.prevCycle, countryIso, year })
  }
  return odp
}
