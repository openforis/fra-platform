import { Country } from 'meta/area'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { CountryService } from 'server/service/country'

type Props = {
  assessment: Assessment
  cycle: Cycle
  originalDataPoint: OriginalDataPoint
  country: Country
  user: User
}

export const updateOriginalDataPointNationalClasses = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, country, originalDataPoint, user } = props

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
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)
    await CountryService.updateLastEdit({ assessment, cycle, country, user, lastEditOdp: true }, t)

    return updatedOriginalDataPoint
  })
}
