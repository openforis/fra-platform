import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'
import { FileSummary } from 'meta/file'

import { BaseProtocol, DB } from 'server/db'
import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { FileRepository } from 'server/repository/public/file'

import { bufferToPdfMulterFile } from './utils'

type Props = {
  assessment: Assessment
  buffer: Buffer
  countryIso: CountryIso
  cycle: Cycle
  fileName: string
}

type Returned = {
  fileSummary: FileSummary
  repositoryItem: RepositoryItem
}

export const updateFile = async (props: Props): Promise<Returned> => {
  const { assessment, buffer, countryIso, cycle, fileName } = props

  return DB.tx(async (t: BaseProtocol) => {
    const getRepositoryItemProps = { assessment, countryIso, cycle, fileName }
    const repositoryItem = await RepositoryRepository.getOne(getRepositoryItemProps, t)
    const fileToRemoveUuid = repositoryItem.fileUuid

    const pdfMulterFile = bufferToPdfMulterFile({ buffer, fileName })
    const newFile = await FileRepository.create({ file: pdfMulterFile }, t)

    const updateRepositoryItemProps: RepositoryItem = {
      ...repositoryItem,
      fileUuid: newFile.uuid,
    }
    const updateRepositoryProps = { assessment, cycle, repositoryItem: updateRepositoryItemProps }
    const target = await RepositoryRepository.update(updateRepositoryProps, t)

    await FileRepository.removeOne({ uuid: fileToRemoveUuid }, t)

    return {
      fileSummary: newFile,
      repositoryItem: target,
    }
  })
}
