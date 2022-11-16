import { ActivityLogMessage, Assessment } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment/assessment'
import { ActivityLogRepository } from '@server/repository/public/activityLog'

export const update = async (
  props: { user: User; assessment: Assessment },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment, user } = props
  // await AssessmentRepository.updateAssessmentSchema({ assessment }, client)

  return client.tx(async (t) => {
    const updatedAssessment = await AssessmentRepository.updateAssessment({ assessment }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: updatedAssessment,
          section: 'assessment',
          message: ActivityLogMessage.assessmentUpdate,
          user,
        },
        assessment: updatedAssessment,
      },
      t
    )
    return updatedAssessment
  })
}
