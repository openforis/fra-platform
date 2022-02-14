import { BaseProtocol, DB, Schemas } from '@server/db'
import { OriginalDataPointRepository, ActivityLogRepository } from '@server/repository'
import { Assessment, ActivityLogMessage, Cycle, OriginalDataPoint } from '@meta/assessment'
import { User } from '@meta/user'

export const createOriginalDataPoint = async (
  props: {
    user: User
    assessment: Assessment
    assessmentCycle: Cycle
    originalDataPoint: OriginalDataPoint
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, assessmentCycle, originalDataPoint, user } = props
  const schemaName = Schemas.getName(assessment)

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
        schemaName,
      },
      t
    )
    return createdOriginalDataPoint
  })
}
