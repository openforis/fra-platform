import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, OriginalDataPoint } from 'meta/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { HistoryLastApprovedInfo } from 'meta/cycleData/historyLastApproved'

import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  info: HistoryLastApprovedInfo
  year: string
}

export const getOriginalDataPointLastApproved = async (props: Props): Promise<OriginalDataPoint | undefined> => {
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
