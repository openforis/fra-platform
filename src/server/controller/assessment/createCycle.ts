import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user'

import { CacheController } from 'server/controller/cache'
import { BaseProtocol, DB } from 'server/db'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { AssessmentRedisRepository } from 'server/repository/redis/assessment'

type Props = {
  assessment: Assessment
  name: string
  user: User
  cycleSource?: Cycle
  withCountries?: boolean
}

type Returned = { assessment: Assessment; cycle: Cycle }

export const createCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycleSource, name, user, withCountries } = props

  return client.tx(async (t) => {
    const cycle = await CycleRepository.create({ assessment, cycleSource, name, withCountries }, t)
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
