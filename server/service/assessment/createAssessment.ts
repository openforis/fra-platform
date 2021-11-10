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
  const schemaName = await AssessmentRepository.createAssessmentSchema({ assessment }, client)

  return client.tx(async (t) => {
    const createdAssessment = await AssessmentRepository.createAssessment({ assessment }, t)
    const activityLogEntry = await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: assessment,
          section: 'assessment',
          message: ActivityLogMessage.assessmentCreate,
          user,
        },
        schemaName,
      },
      t
    )
    return { schemaName, activityLogEntry, assessment: createdAssessment }
  })
}
