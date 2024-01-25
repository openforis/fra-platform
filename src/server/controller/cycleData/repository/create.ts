import { AreaCode } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { RepositoryEntity } from 'meta/cycleData'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode

  file: Express.Multer.File
  link?: string
  name: string

  user: User
}

export const create = async (props: Props): Promise<RepositoryEntity> => {
  const { assessment, countryIso, user } = props

  return DB.tx(async (t: BaseProtocol) => {
    const createdRepository = await RepositoryRepository.create(props, t)

    const target = { fileName: createdRepository.name, uuid: createdRepository.uuid }
    const message = ActivityLogMessage.assessmentFileCreate
    const activityLog = { target, section: 'assessment', message, countryIso, user }
    const activityLogParams = { activityLog, assessment }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)

    return createdRepository
  })
}
