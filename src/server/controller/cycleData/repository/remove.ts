import { AreaCode } from 'meta/area/areaCode'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionNames } from 'meta/routes/sectionNames'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { RepositoryRepository } from 'server/db/repository/assessmentCycle/repository'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { FileRepository } from 'server/db/repository/public/file'
import { FileStorage } from 'server/service/fileStorage'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode

  user: User

  uuid: string
}

export const remove = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, user } = props

  return DB.tx(async (t: BaseProtocol) => {
    const target = await RepositoryRepository.remove(props, t)

    // If deleting a repository item file, delete also the file reference
    if (target.fileUuid) {
      await FileRepository.remove({ uuid: target.fileUuid }, t)
      await FileStorage.File.remove({ key: target.fileUuid })
    }

    const message = ActivityLogMessage.repositoryItemDelete
    const section = SectionNames.Country.Home.repository
    const activityLog = { target, section, message, countryIso, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)
  })
}
