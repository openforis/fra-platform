import { Readable } from 'stream'

import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'
import { Translations } from 'meta/translation/translations'
import { Promises } from 'utils/promises'

import { RepositoryRepository } from 'server/db/repository/assessmentCycle/repository'
import { FileRepository } from 'server/db/repository/public/file'
import { FileStorage } from 'server/service/fileStorage'

type Props = {
  cycle: Cycle
  countryIso?: CountryIso
  global: boolean
}

type Returned = Array<{
  fileName: string
  file: Readable
}>

export const getManyFiles = async (props: Props): Promise<Returned> => {
  const { countryIso, cycle, global } = props

  const cycleUuid = cycle.uuid
  const repositoryItems = await RepositoryRepository.getMany({ cycleUuid, countryIso, global })

  const repositoryProps = { fileUuids: repositoryItems.map((item) => item.fileUuid) }
  const files = await FileRepository.getMany(repositoryProps)

  await Promises.each(files, async (file) => {
    const { uuid: key } = file
    // eslint-disable-next-line no-param-reassign
    file.file = await FileStorage.File.get({ key })
  })

  return files.map((file) => {
    const repositoryItem = repositoryItems.find((item) => item.fileUuid === file.uuid)
    const label = Translations.getLabel({ translation: repositoryItem.props.translation, language: Lang.en })
    const extension = file.name.split('.').pop()
    const fileName = `${label}.${extension}`
    return { fileName, file: file.file }
  })
}
