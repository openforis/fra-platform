import { ActivityLogMessage, Assessment } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { CycleRepository } from '@server/repository/assessmentCycle/cycle'

export const createCycle = async (
  props: { user: User; assessment: Assessment; name: string },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { user, assessment, name } = props
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
        assessment: updatedAssessment,
        cycle: updatedAssessment.cycles.at(-1), // Last created cycle
      },
      t
    )
    return updatedAssessment
  })
}
