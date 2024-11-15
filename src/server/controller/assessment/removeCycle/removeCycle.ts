import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { generateMetaCache } from 'server/controller/assessment/generateMetaCache'
import { removeDataCache } from 'server/controller/assessment/removeCycle/removeDataCache'
import { removeMetadata } from 'server/controller/assessment/removeCycle/removeMetadata'
import { removeMetadataCache } from 'server/controller/assessment/removeCycle/removeMetadataCache'
import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

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

    // update cache
    await generateMetaCache(t)
    await removeMetadataCache({ assessment, cycle }, t)
    await removeDataCache({ assessment, cycle }, t)

    const message = ActivityLogMessage.assessmentCycleDelete
    const activityLog = { target: cycle, section: 'assessment', message, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment }, t)

    return {
      assessment: await AssessmentRepository.getOne({ assessmentName: assessment.props.name }, t),
      cycle,
    }
  })

  await CycleRepository.removeSchema({ assessment, cycle: cycleProps })

  return returned
}
