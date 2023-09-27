import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const updateOriginalDataPointDescription = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    originalDataPoint: OriginalDataPoint
    user: User
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, originalDataPoint, user } = props

  return client.tx(async (t) => {
    const updatedOriginalDataPoint = await OriginalDataPointRepository.updateDescription(
      { assessment, cycle, originalDataPoint },
      t
    )

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: updatedOriginalDataPoint,
          section: 'odp',
          message: ActivityLogMessage.originalDataPointUpdateDescription,
          countryIso: originalDataPoint.countryIso,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    return updatedOriginalDataPoint
  })
}
