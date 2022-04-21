import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'

export const updateOriginalDataPoint = async (
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
    const updatedOriginalDataPoint = await OriginalDataPointRepository.update(
      { assessment, assessmentCycle, originalDataPoint },
      t
    )

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: updatedOriginalDataPoint,
          section: 'assessment',
          message: ActivityLogMessage.originalDataPointUpdate,
          user,
        },
        assessment,
        cycle: assessmentCycle,
      },
      t
    )
    return updatedOriginalDataPoint
  })
}
