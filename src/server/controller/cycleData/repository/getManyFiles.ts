import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Lang } from 'meta/lang'
import { Translations } from 'meta/translation'

import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { FileRepository } from 'server/repository/public/file'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso?: CountryIso
  global: boolean
}

type Returned = Array<{
  fileName: string
  file: Buffer
}>

export const getManyFiles = async (props: Props): Promise<Returned> => {
  const { assessment, cycle, countryIso, global } = props

  const getRepositoryItemProps = { assessment, cycle, countryIso, global }
  const repositoryItems = await RepositoryRepository.getMany(getRepositoryItemProps)

  const repositoryProps = { fileUuids: repositoryItems.map((item) => item.fileUuid) }
  const files = await FileRepository.getMany(repositoryProps)

  return files.map((file) => {
    const repositoryItem = repositoryItems.find((item) => item.fileUuid === file.uuid)
    const label = Translations.getLabel({ translation: repositoryItem.props.translation, language: Lang.en })
    const extension = file.name.split('.').pop()
    const fileName = `${label}.${extension}`
    return { fileName, file: file.file }
  })
}
