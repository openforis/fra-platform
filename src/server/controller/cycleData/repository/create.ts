import { AreaCode } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { Repository } from 'meta/cycleData'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { FileRepository } from 'server/repository/public/file'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode

  file: Express.Multer.File
  link?: string
  name: string

  user: User
}

export const create = async (props: Props): Promise<Repository> => {
  const { assessment, countryIso, user } = props

  return DB.tx(async (t: BaseProtocol) => {
    let fileUuid = null
    if (props.file) fileUuid = await FileRepository.create(props, t)

    const repositoryProps = { ...props, fileUuid }
    const target = await RepositoryRepository.create(repositoryProps, t)

    const message = ActivityLogMessage.assessmentFileCreate
    const activityLog = { target, section: 'assessment', message, countryIso, user }
    const activityLogParams = { activityLog, assessment }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)

    return target
  })
}
