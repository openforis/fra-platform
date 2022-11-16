import { ActivityLogMessage, Assessment } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment/assessment'
import { ActivityLogRepository } from '@server/repository/public/activityLog'

export const updateDefaultCycle = async (
  props: { user: User; assessment: Assessment },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment, user } = props

  return client.tx(async (t) => {
    const updatedAssessment = await AssessmentRepository.updateDefaultCycle({ assessment }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: updatedAssessment,
          section: 'assessment',
          message: ActivityLogMessage.assessmentUpdate,
          user,
        },
        assessment,
      },
      t
    )
    return updatedAssessment
  })
}
