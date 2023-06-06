import { ActivityLogMessage, Assessment } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const create = async (
  props: { user: User; assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment, user } = props
  await AssessmentRepository.createAssessmentSchema({ assessment }, client)

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
        assessment: createdAssessment,
      },
      t
    )
    return createdAssessment
  })
}
