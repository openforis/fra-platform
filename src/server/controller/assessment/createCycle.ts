import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycleSource?: Cycle
  name: string
  user: User
}

type Returned = { assessment: Assessment; cycle: Cycle }

export const createCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycleSource, name, user } = props

  return client.tx(async (t) => {
    const { assessment: updatedAssessment, cycle } = await CycleRepository.create({ assessment, cycleSource, name }, t)

    const message = ActivityLogMessage.assessmentCycleCreate
    const activityLog = { target: updatedAssessment, section: 'assessment', message, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment: updatedAssessment, cycle }, t)

    return { assessment: updatedAssessment, cycle }
  })
}
