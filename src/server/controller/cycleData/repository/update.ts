import { AreaCode } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'
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
  repositoryItem: RepositoryItem

  user: User
}

export const update = async (props: Props): Promise<RepositoryItem> => {
  const { assessment, countryIso, user, repositoryItem: repositoryItemProps } = props

  return DB.tx(async (t: BaseProtocol) => {
    let fileUuid = repositoryItemProps.link ? undefined : repositoryItemProps.fileUuid
    if (props.file) {
      fileUuid = await FileRepository.create(props, t)
    }

    const repositoryItem = { ...repositoryItemProps, fileUuid }
    const repositoryProps = { ...props, repositoryItem }
    const target = await RepositoryRepository.update(repositoryProps, t)

    const message = ActivityLogMessage.assessmentFileUpdate
    const activityLog = { target, section: 'assessment', message, countryIso, user }
    const activityLogParams = { activityLog, assessment }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)

    return target
  })
}
