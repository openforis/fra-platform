import { errors as pgErrors } from 'pg-promise'

import { RepositoryItem } from 'meta/cycleData/repository/item'
import { File } from 'meta/file/file'

import { RepositoryRepository } from 'server/db/repository/assessmentCycle/repository'
import { FileRepository } from 'server/db/repository/public/file'
import { FileStorage } from 'server/service/fileStorage'

type Props = {
  fileName: string
}

type Returned = {
  file: File
  repositoryItem: RepositoryItem
}

export const getOne = async (props: Props): Promise<Returned | undefined> => {
  const { fileName } = props
  try {
    const repositoryItem = await RepositoryRepository.getOne({ fileName })

    const fileRepositoryProps = { fileUuid: repositoryItem.fileUuid }
    const fileSummary = await FileRepository.getOne(fileRepositoryProps)
    const { uuid: key } = fileSummary
    const fileData = await FileStorage.File.get({ key })
    const file = { ...fileSummary, file: fileData }

    return { file, repositoryItem }
  } catch (error) {
    if (error instanceof pgErrors.QueryResultError && error.code === pgErrors.queryResultErrorCode.noData) {
      return undefined
    }
    throw error
  }
}
