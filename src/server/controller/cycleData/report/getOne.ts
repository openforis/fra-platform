import { errors as pgErrors } from 'pg-promise'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'
import { File } from 'meta/file'

import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { FileRepository } from 'server/repository/public/file'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  fileName: string
}

type Returned =
  | {
      file: File
      repositoryItem: RepositoryItem
    }
  | undefined

export const getOne = async (props: Props): Promise<Returned> => {
  try {
    const repositoryItem = await RepositoryRepository.getOne(props)

    const fileRepositoryProps = { fileUuid: repositoryItem.fileUuid }
    const file = await FileRepository.getOne(fileRepositoryProps)

    return { file, repositoryItem }
  } catch (error) {
    if (error instanceof pgErrors.QueryResultError && error.code === pgErrors.queryResultErrorCode.noData) {
      return undefined
    }
    throw error
  }
}
