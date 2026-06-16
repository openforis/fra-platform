import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { RepositoryRepository } from 'server/db/repository/assessmentCycle/repository'
import { FileRepository } from 'server/db/repository/public/file'

type Props = {
  assessment: Assessment
  cycle: Cycle

  uuid: string
}

type Returned = {
  name: string
  size: number
}

export const getFileMeta = async (props: Props): Promise<Returned | null> => {
  const { assessment, cycle, uuid } = props

  const repositoryItem = await RepositoryRepository.getOne({ assessment, cycle, uuid })
  if (!repositoryItem.fileUuid) return null

  const summary = await FileRepository.getSummary({ fileUuid: repositoryItem.fileUuid })

  return { name: summary.name, size: summary.size }
}
