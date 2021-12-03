import { BaseProtocol, DB, Schemas } from '@server/db'
import { AssessmentRepository, ActivityLogRepository } from '@server/repository'
import { Assessment, Cycle, ActivityLogMessage } from '@core/meta/assessment'

import { User } from '@core/meta/user'

export const createAssessmentCycle = async (
  props: { user: User; assessment: Assessment; name: string },
  client: BaseProtocol = DB
): Promise<Cycle> => {
  const { user, assessment, name } = props
  const schemaName = Schemas.getName(assessment)

  return client.tx(async (t) => {
    const createdAssessmentCycle = await AssessmentRepository.createAssessmentCycle({ assessment, name }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: createdAssessmentCycle,
          section: 'assessment',
          message: ActivityLogMessage.assessmentCycleCreate,
          user,
        },
        schemaName,
      },
      t
    )
    return createdAssessmentCycle
  })
}
