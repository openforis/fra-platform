import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { CountryService } from 'server/service/country'

type Props = {
  assessment: Assessment
  cycle: Cycle
  originalDataPoint: OriginalDataPoint
  country: Country
  user: User
}

export const updateNationalClasses = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, country, cycle, originalDataPoint, user } = props

  return client.tx(async (t) => {
    const updatedOriginalDataPoint = await OriginalDataPointRepository.updateNationalClasses(
      { assessment, cycle, originalDataPoint },
      t
    )

    const activityLog = {
      target: updatedOriginalDataPoint,
      section: 'odp',
      message: ActivityLogMessage.originalDataPointUpdateNationalClasses,
      countryIso: originalDataPoint.countryIso,
      user,
    }
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { activityLog, assessment, cycle },
      t
    )
    await CountryService.updateLastEdit({ assessment, cycle, country, user, lastEditOdp: true, lastUpdateTimestamp }, t)

    return updatedOriginalDataPoint
  })
}
