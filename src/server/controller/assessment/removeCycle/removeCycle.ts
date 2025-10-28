import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { removeMetadata } from 'server/controller/assessment/removeCycle/removeMetadata'
import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { CycleRedisRepository } from 'server/cache/repository/cycle'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { StaticFiles } from 'server/static/staticFiles'

type Props = {
  assessment: Assessment
  cycle: Cycle
  user: User
}

type Returned = {
  assessment: Assessment
  cycle: Cycle
}

export const removeCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycle: cycleProps, user } = props

  const returned = await client.tx(async (t) => {
    const cycle = await CycleRepository.remove({ cycle: cycleProps }, t)

    await removeMetadata({ assessment, cycle }, t)

    // remove static files
    await StaticFiles.removeCycle({ assessment, cycle })
    // insert activity log
    const message = ActivityLogMessage.assessmentCycleDelete
    const activityLog = { target: cycle, section: 'assessment', message, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment }, t)

    // update cache
    const { name: assessmentName } = assessment.props
    const assessmentCache = await AssessmentRedisRepository.getOne({ assessmentName, force: true }, t)
    await CycleRedisRepository.removeOne({ assessment: assessmentCache, cycle }, t)

    return { assessment: assessmentCache, cycle }
  })

  await CycleRepository.removeSchema({ assessment, cycle: cycleProps })

  return returned
}
