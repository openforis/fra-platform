import { Assessment, Cycle } from 'meta/assessment'
import { FileMeta } from 'meta/file'

import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { FileRepository } from 'server/repository/public/file'
import { FileStorage } from 'server/service/fileStorage'

type Props = {
  assessment: Assessment
  cycle: Cycle

  uuid: string
}

type Returned = FileMeta

export const getFileMeta = async (props: Props): Promise<Returned> => {
  const { assessment, cycle, uuid } = props

  const getRepositoryItemProps = { assessment, cycle, uuid }
  const repositoryItem = await RepositoryRepository.getOne(getRepositoryItemProps)

  const [usages, summary] = await Promise.all([
    RepositoryRepository.getUsages({ uuid, cycle, assessment }),
    FileRepository.getSummary({ fileUuid: repositoryItem.fileUuid }),
  ])

  summary.size = await FileStorage.getFileSize({ key: repositoryItem.fileUuid })

  return {
    usages,
    summary: { ...summary, repositoryItemUuid: repositoryItem.uuid },
  }
}
