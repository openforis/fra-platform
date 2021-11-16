import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment'
import { Assessment } from '@core/meta/assessment'
import { ActivityLogRepository } from '@server/repository/activityLog'
import { ActivityLogMessage } from '@core/meta/activityLog'
import { User } from '@core/auth'

export const createAssessment = async (
  props: { user: User; assessment: Assessment },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment, user } = props
  const schemaName = await AssessmentRepository.createAssessmentSchema({ assessment }, client)

  return client.tx(async (t) => {
    const createdAssessment = await AssessmentRepository.createAssessment({ assessment }, t)
    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: createdAssessment,
          section: 'assessment',
          message: ActivityLogMessage.assessmentCreate,
          user,
        },
        schemaName,
      },
      t
    )
    return createdAssessment
  })
}
