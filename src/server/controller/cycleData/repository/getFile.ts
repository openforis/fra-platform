import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { FileRepository } from 'server/repository/public/file'

type Props = {
  assessment: Assessment
  cycle: Cycle

  uuid: string
}

type Returned = {
  file: Buffer
  repositoryItem: RepositoryItem
}

export const getFile = async (props: Props): Promise<Returned> => {
  const { assessment, cycle, uuid } = props

  const getRepositoryItemProps = { assessment, cycle, uuid }
  const repositoryItem = await RepositoryRepository.getOne(getRepositoryItemProps)

  const repositoryProps = { fileUuid: repositoryItem.fileUuid }
  const { file } = await FileRepository.get(repositoryProps)
  return { file, repositoryItem }
}
