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

type Target = {
  fileName: string
  uuid: string
  link?: string
  fileUuid?: string
}

export const create = async (props: Props): Promise<RepositoryEntity> => {
  const { assessment, countryIso, user } = props

  return DB.tx(async (t: BaseProtocol) => {
    const createdRepository = await RepositoryRepository.create(props, t)

    const target: Target = { fileName: createdRepository.name, uuid: createdRepository.uuid }

    if ('link' in createdRepository) target.link = createdRepository.link
    if ('fileUuid' in createdRepository) target.fileUuid = createdRepository.fileUuid

    const message = ActivityLogMessage.assessmentFileCreate
    const activityLog = { target, section: 'assessment', message, countryIso, user }
    const activityLogParams = { activityLog, assessment }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)

    return createdRepository
  })
}
