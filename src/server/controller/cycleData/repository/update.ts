import { AreaCode } from 'meta/area/areaCode'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { SectionNames } from 'meta/routes'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { RepositoryRepository } from 'server/db/repository/assessmentCycle/repository'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode

  repositoryItem: RepositoryItem

  user: User
}

export const update = async (props: Props): Promise<RepositoryItem> => {
  const { assessment, countryIso, cycle, user } = props

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
