import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { FileSummary } from 'meta/file/file'

import { BaseProtocol, DB } from 'server/db/db'
import { RepositoryRepository } from 'server/db/repository/assessmentCycle/repository'
import { FileRepository } from 'server/db/repository/public/file'
import { FileStorage } from 'server/service/fileStorage'

import { bufferToPdfMulterFile } from './utils'

type Props = {
  assessment: Assessment
  bufferView: ArrayBufferView
  countryIso: CountryIso
  cycle: Cycle
  fileName: string
}

type Returned = {
  fileSummary: FileSummary
  repositoryItem: RepositoryItem
}

export const updateFile = async (props: Props): Promise<Returned> => {
  const { assessment, bufferView, countryIso, cycle, fileName } = props

  return DB.tx(async (t: BaseProtocol) => {
    const getRepositoryItemProps = { assessment, countryIso, cycle, fileName }
    const repositoryItem = await RepositoryRepository.getOne(getRepositoryItemProps, t)

    const pdfMulterFile = bufferToPdfMulterFile({ bufferView, fileName })
    const newFile = await FileRepository.create({ fileName: pdfMulterFile.originalname, size: pdfMulterFile.size }, t)
    const { uuid: key } = newFile
    const body = pdfMulterFile.buffer
    await FileStorage.File.upload({ key, body })

    const updateRepositoryItemProps: RepositoryItem = { ...repositoryItem, fileUuid: newFile.uuid }
    const updateRepositoryProps = { assessment, cycle, repositoryItem: updateRepositoryItemProps }
    const target = await RepositoryRepository.update(updateRepositoryProps, t)

    return {
      fileSummary: newFile,
      repositoryItem: target,
    }
  })
}
