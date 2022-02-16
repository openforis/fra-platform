import { BaseProtocol, DB, Schemas } from '@server/db'
import { ActivityLogRepository, OriginalDataPointRepository } from '@server/repository'
import { Assessment, ActivityLogMessage, Cycle, OriginalDataPoint } from '@meta/assessment'
import { User } from '@meta/user'

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
  const schemaName = Schemas.getName(assessment)

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
        schemaName,
      },
      t
    )
    return updatedOriginalDataPoint
  })
}
