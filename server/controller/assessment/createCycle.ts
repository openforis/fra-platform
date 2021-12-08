import { BaseProtocol, DB, Schemas } from '@server/db'
import { AssessmentRepository, ActivityLogRepository } from '@server/repository'
import { Assessment, ActivityLogMessage } from '@core/meta/assessment'

import { User } from '@core/meta/user'

export const createCycle = async (
  props: { user: User; assessment: Assessment; name: string },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { user, assessment, name } = props
  const schemaName = Schemas.getName(assessment)

  return client.tx(async (t) => {
    const updatedAssessment = await AssessmentRepository.createCycle({ assessment, name }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: updatedAssessment,
          section: 'assessment',
          message: ActivityLogMessage.assessmentCycleCreate,
          user,
        },
        schemaName,
      },
      t
    )
    return updatedAssessment
  })
}
