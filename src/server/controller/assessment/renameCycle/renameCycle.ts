import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { CacheController } from 'server/cache/controller'
import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { renameDataCache } from 'server/controller/assessment/renameCycle/renameDataCache'
import { renameMetadataCache } from 'server/controller/assessment/renameCycle/renameMetadataCache'
import { renameValidationsCache } from 'server/controller/assessment/renameCycle/renameValidationsCache'
import { BaseProtocol, DB } from 'server/db/db'
import { CycleRepository } from 'server/db/repository/assessmentCycle/cycle'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { StaticFiles } from 'server/static/staticFiles'

type Props = {
  assessment: Assessment
  cycle: Cycle
  name: string
  user: User
}

type Returned = {
  assessment: Assessment
  cycle: Cycle
}

export const renameCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycle: cycleSource, name, user } = props
  const { name: assessmentName } = assessment.props
  const { uuid: cycleUuid } = cycleSource

  return client.tx(async (t) => {
    const cycleTarget = await CycleRepository.rename({ assessment, cycle: cycleSource, name }, t)

    const propsRename = { assessment, cycleSource, cycleTarget }

    // update cache
    await CacheController.generateMetaCache({}, t)
    await renameMetadataCache(propsRename, t)
    await renameDataCache(propsRename, t)
    await renameValidationsCache(propsRename, t)
    // rename static files
    await StaticFiles.renameCycle(propsRename)
    // insert activity log
    const message = ActivityLogMessage.assessmentCycleRename
    const activityLog = { target: cycleTarget, section: 'assessment', message, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment }, t)

    return AssessmentRedisRepository.getOneWithCycle({ assessmentName, cycleUuid, force: true }, t)
  })
}
