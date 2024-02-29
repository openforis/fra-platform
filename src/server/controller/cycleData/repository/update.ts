import { AreaCode } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'
import { SectionNames } from 'meta/routes'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode

  repositoryItem: RepositoryItem

  user: User
}

export const update = async (props: Props): Promise<RepositoryItem> => {
  const { assessment, cycle, countryIso, user } = props

  return DB.tx(async (t: BaseProtocol) => {
    const target = await RepositoryRepository.update(props, t)

    const message = ActivityLogMessage.repositoryItemUpdate
    const section = SectionNames.Country.Home.repository
    const activityLog = { target, section, message, countryIso, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)

    return target
  })
}
