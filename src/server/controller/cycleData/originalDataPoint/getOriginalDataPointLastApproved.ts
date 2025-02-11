import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { HistoryLastApprovedInfo } from 'meta/cycleData/historyLastApproved'

import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  info: HistoryLastApprovedInfo
  year: string
}

export const getOriginalDataPointLastApproved = (props: Props): Promise<OriginalDataPoint | undefined> => {
  const { assessment, countryIso, cycle, info, year } = props

  if (!Objects.isNil(info.lastAccepted)) {
    return OriginalDataPointRepository.getLastAccepted({ assessment, cycle, countryIso, year })
  }
  if (!Objects.isNil(info.prevCycle)) {
    return OriginalDataPointRepository.getOne({ assessment, cycle: info.prevCycle, countryIso, year })
  }
  return undefined
}
