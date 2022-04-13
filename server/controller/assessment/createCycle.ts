import { ActivityLogMessage, Assessment } from '@meta/assessment'
import { User } from '@meta/user'
import { BaseProtocol, DB, Schemas } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { CycleRepository } from '@server/repository/assessmentCycle/cycle'

export const createCycle = async (
  props: { user: User; assessment: Assessment; name: string },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { user, assessment, name } = props
  const schemaName = Schemas.getName(assessment)

  return client.tx(async (t) => {
    const updatedAssessment = await CycleRepository.create({ assessment, name }, t)

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
