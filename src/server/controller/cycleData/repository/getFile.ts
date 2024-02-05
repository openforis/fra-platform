import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { BaseProtocol, DB } from 'server/db'
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

  return DB.tx(async (t: BaseProtocol) => {
    const getRepositoryItemProps = { assessment, cycle, uuid }
    const repositoryItem = await RepositoryRepository.get(getRepositoryItemProps, t)

    const repositoryProps = { fileUuid: repositoryItem.fileUuid }
    const { file } = await FileRepository.get(repositoryProps, t)
    return { file, repositoryItem }
  })
}
