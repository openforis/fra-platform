import { AreaCode } from 'meta/area'
import { ActivityLogMessage, Assessment } from 'meta/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionNames } from 'meta/routes'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { FileRepository } from 'server/repository/public/file'
import { FileStorage } from 'server/service/fileStorage'

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
    await FileRepository.remove({ uuid: target.fileUuid }, t)
    await FileStorage.removeFile({ key: target.fileUuid })

    const message = ActivityLogMessage.repositoryItemDelete
    const section = SectionNames.Country.Home.repository
    const activityLog = { target, section, message, countryIso, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)
  })
}
