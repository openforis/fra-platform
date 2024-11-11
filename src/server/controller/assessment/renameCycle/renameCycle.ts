import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { generateMetaCache } from 'server/controller/assessment/generateMetaCache'
import { getOneWithCycle } from 'server/controller/assessment/getOne'
import { renameDataCache } from 'server/controller/assessment/renameCycle/renameDataCache'
import { renameMetadataCache } from 'server/controller/assessment/renameCycle/renameMetadataCache'
import { BaseProtocol, DB } from 'server/db'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

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

    // update cache
    await generateMetaCache(t)
    await renameMetadataCache({ assessment, cycleSource, cycleTarget }, t)
    await renameDataCache({ assessment, cycleSource, cycleTarget }, t)

    const message = ActivityLogMessage.assessmentCycleRename
    const activityLog = { target: cycleTarget, section: 'assessment', message, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment }, t)

    return getOneWithCycle({ assessmentName, cycleUuid }, t)
  })
}
