import { AreaCode } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  user: User
  uuid: string
}

export const remove = async (props: Props): Promise<void> => {
  const { assessment, cycle, countryIso, user } = props

  return DB.tx(async (t: BaseProtocol) => {
    const target = await RepositoryRepository.remove(props, t)

    const message = ActivityLogMessage.assessmentFileDelete
    const activityLog = { target, section: 'assessment', message, countryIso, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)
  })
}
