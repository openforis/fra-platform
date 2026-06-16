import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint, OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { CountryService } from 'server/service/country'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  field: OriginalDataPointCommentKey
  originalDataPoint: OriginalDataPoint
  user: User
}

const activities: Record<OriginalDataPointCommentKey, ActivityLogMessage> = {
  [TableNames.extentOfForest]: ActivityLogMessage.originalDataPointUpdateCommentExtentOfForest,
  [TableNames.forestCharacteristics]: ActivityLogMessage.originalDataPointUpdateCommentForestCharacteristics,
}

export const updateComments = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, country, cycle, field, originalDataPoint, user } = props
  const { countryIso } = originalDataPoint

  return client.tx(async (t) => {
    const updatedOriginalDataPoint = await OriginalDataPointRepository.updateDescription(
      { assessment, cycle, field, originalDataPoint },
      t
    )

    const message = activities[field]

    const activityLog = {
      target: updatedOriginalDataPoint,
      section: 'odp',
      message,
      countryIso,
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
