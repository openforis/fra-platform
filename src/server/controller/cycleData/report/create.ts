import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData'
import { FileSummary } from 'meta/file'

import { BaseProtocol, DB } from 'server/db/db'
import { RepositoryRepository } from 'server/db/repository/assessmentCycle/repository'
import { FileRepository } from 'server/db/repository/public/file'
import { FileStorage } from 'server/service/fileStorage'

import { bufferToPdfMulterFile } from './utils'

type Props = {
  assessment: Assessment
  buffer: Buffer
  countryIso: CountryIso
  cycle: Cycle
  fileName: string
}

type Returned =
  | {
      fileSummary: FileSummary
      repositoryItem: RepositoryItem
    }
  | undefined

export const create = async (props: Props): Promise<Returned> => {
  const { assessment, buffer, countryIso, cycle, fileName } = props

  const pdfMulterFile = bufferToPdfMulterFile({ buffer, fileName })

  return DB.tx(async (t: BaseProtocol) => {
    const file = await FileRepository.create({ fileName: pdfMulterFile.originalname }, t)
    const { uuid: key } = file
    const body = pdfMulterFile.buffer
    await FileStorage.File.upload({ key, body })

    const repositoryItemProps: Partial<RepositoryItem> = {
      countryIso,
      fileUuid: file.uuid,
      props: {
        hidden: true,
        translation: { en: fileName },
      },
    }
    const repositoryItem = await RepositoryRepository.create(
      {
        assessment,
        countryIso,
        cycle,
        repositoryItem: repositoryItemProps,
      },
      t
    )

    return {
      fileSummary: file,
      repositoryItem,
    }
  })
}
