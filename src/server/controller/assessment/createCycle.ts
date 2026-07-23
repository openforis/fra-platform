import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { CacheController } from 'server/cache/controller'
import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { CycleRepository } from 'server/db/repository/assessmentCycle/cycle'
import { CreateCycleOptions } from 'server/db/repository/assessmentCycle/cycle/create'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  assessment: Assessment
  options: CreateCycleOptions
  user: User
}

type Returned = { assessment: Assessment; cycle: Cycle }

export const createCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, options, user } = props

  return client.tx(async (t) => {
    const cycle = await CycleRepository.create({ assessment, options }, t)
    const { name: assessmentName } = assessment.props
    const { name: cycleName } = cycle
    await CacheController.generateMetaCache({}, t)
    const updatedAssessment = await CacheController.generateAssessment({ assessmentName }, t)

    const message = ActivityLogMessage.assessmentCycleCreate
    const activityLog = { target: updatedAssessment, section: 'assessment', message, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment: updatedAssessment, cycle }, t)

    return AssessmentRedisRepository.getOneWithCycle({ assessmentName, cycleName, force: true }, t)
  })
}
