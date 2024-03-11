import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'
import { File } from 'meta/file'

import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { FileRepository } from 'server/repository/public/file'

type Props = {
  assessment: Assessment
  cycle: Cycle

  uuid: string
}

type Returned = {
  file: File
  repositoryItem: RepositoryItem
}

export const getOneFile = async (props: Props): Promise<Returned> => {
  const { assessment, cycle, uuid } = props

  const getRepositoryItemProps = { assessment, cycle, uuid }
  const repositoryItem = await RepositoryRepository.getOne(getRepositoryItemProps)

  const repositoryProps = { fileUuid: repositoryItem.fileUuid }
  const file = await FileRepository.getOne(repositoryProps)
  return { file, repositoryItem }
}
