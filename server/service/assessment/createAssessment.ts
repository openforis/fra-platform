import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment'
import { Assessment } from '@core/meta/assessment'
import { ActivityLogRepository } from '@server/repository/activityLog'
import { ActivityLog, ActivityLogMessage } from '@core/meta/activityLog'
import { User } from '@core/auth'

export const createAssessment = async (
  props: { user: User; assessment: Assessment },
  client: BaseProtocol = DB
): Promise<{
  schemaName: string
  activityLogEntry: ActivityLog<any>
}> => {
  const { assessment, user } = props
  return client.tx(async (t) => {
    const schemaName = await AssessmentRepository.createAssessmentSchema({ assessment }, t)
    const activityLogEntry = await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          countryIso: null,
          target: null,
          section: null,
          message: ActivityLogMessage.assessmentCreate,
          user,
        },
        schemaName,
      },
      t
    )
    return { schemaName, activityLogEntry }
  })
}
