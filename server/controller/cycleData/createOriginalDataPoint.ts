import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'

export const createOriginalDataPoint = async (
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
    const createdOriginalDataPoint = await OriginalDataPointRepository.create(
      { assessment, assessmentCycle, originalDataPoint },
      t
    )

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: createdOriginalDataPoint,
          section: 'assessment',
          message: ActivityLogMessage.originalDataPointCreate,
          user,
        },
        assessment,
        cycle: assessmentCycle,
      },
      t
    )
    return createdOriginalDataPoint
  })
}
