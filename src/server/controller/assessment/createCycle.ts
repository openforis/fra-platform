import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Returned = { assessment: Assessment; cycle: Cycle }

export const createCycle = async (
  props: { user: User; assessment: Assessment; name: string },
  client: BaseProtocol = DB
): Promise<Returned> => {
  const { user, assessment, name } = props
  return client.tx(async (t) => {
    const { assessment: updatedAssessment, cycle } = await CycleRepository.create({ assessment, name }, t)

    const message = ActivityLogMessage.assessmentCycleCreate
    const activityLog = { target: updatedAssessment, section: 'assessment', message, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment: updatedAssessment, cycle }, t)

    return { assessment: updatedAssessment, cycle }
  })
}
