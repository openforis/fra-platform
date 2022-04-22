import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'

export const removeOriginalDataPoint = async (
  props: {
    assessment: Assessment
    assessmentCycle: Cycle
    originalDataPoint: OriginalDataPoint
    user: User
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, assessmentCycle, originalDataPoint, user } = props

  return client.tx(async (t) => {
    const removedOriginalDataPoint = await OriginalDataPointRepository.remove(
      { assessment, assessmentCycle, originalDataPoint },
      t
    )

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: removedOriginalDataPoint,
          section: 'assessment',
          message: ActivityLogMessage.originalDataPointRemove,
          user,
        },
        assessment,
        cycle: assessmentCycle,
      },
      t
    )
    return removedOriginalDataPoint
  })
}
