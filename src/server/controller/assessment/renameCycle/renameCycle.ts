import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogCycleRename } from 'meta/assessment/activityLog/assessment'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { CacheController } from 'server/cache/controller'
import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { renameDataCache } from 'server/controller/assessment/renameCycle/renameDataCache'
import { renameMetadataCache } from 'server/controller/assessment/renameCycle/renameMetadataCache'
import { renameValidations } from 'server/controller/assessment/renameCycle/renameValidations'
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

const _assertEmpty = async (props: { assessment: Assessment; cycle: Cycle }, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = props
  const sections = await SectionRedisRepository.getMany({ assessment, cycle }, client)
  if (Objects.isEmpty(sections)) throw new Error(`Cycle rename: cycle ${cycle.name} has no metadata`)
}

export const renameCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycle: cycleSource, name, user } = props
  const { name: assessmentName } = assessment.props
  const { uuid: cycleUuid } = cycleSource

  return client.tx(async (t) => {
    await _assertEmpty({ assessment, cycle: cycleSource }, t)

    const cycleTarget = await CycleRepository.rename({ assessment, cycle: cycleSource, name }, t)

    const propsRename = { assessment, cycleSource, cycleTarget }

    // update caches
    const assessments = await AssessmentRedisRepository.getAssessmentsList({ force: true }, t)
    await CacheController.generateMetaCache({ assessments }, t)
    await renameMetadataCache(propsRename, t)
    await renameDataCache(propsRename, t)
    await renameValidations(propsRename, t)
    // rename static files
    await StaticFiles.renameCycle(propsRename)
    // insert activity log
    const message = ActivityLogMessage.assessmentCycleRename
    const activityLog: ActivityLogCycleRename = { target: cycleTarget, section: 'assessment', message, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment }, t)

    return AssessmentRedisRepository.getOneWithCycle({ assessmentName, cycleUuid, force: true }, t)
  })
}
