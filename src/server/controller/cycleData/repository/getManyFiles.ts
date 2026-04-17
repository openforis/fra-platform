import { Readable } from 'stream'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
import { Lang } from 'meta/lang'
import { Translations } from 'meta/translation/translations'

import { RepositoryRepository } from 'server/db/repository/assessmentCycle/repository'
import { FileStorage } from 'server/service/fileStorage'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso?: CountryIso
  global: boolean
}

type FileEntry = {
  fileName: string
  file: Buffer | Readable
}

type Returned = Array<FileEntry>

const collectFileEntries = async (items: Array<RepositoryItemTree>, prefix = ''): Promise<Array<FileEntry>> => {
  const nested = await Promise.all(
    items.map(async (item): Promise<Array<FileEntry>> => {
      if (RepositoryItems.isFolder(item)) {
        return collectFileEntries(item.children, `${prefix}${item.folderName}/`)
      }
      const label = Translations.getLabel({ translation: item.props.translation, language: Lang.en })
      if (item.link) {
        const file = Buffer.from(`[InternetShortcut]\nURL=${item.link}`)
        return [{ fileName: `${prefix}${label}.url`, file }]
      }
      if (item.fileUuid) {
        const file = await FileStorage.File.get({ key: item.fileUuid })
        return [{ fileName: `${prefix}${label}.${item.fileType}`, file }]
      }
      return []
    })
  )
  return nested.flat()
}

export const getManyFiles = async (props: Props): Promise<Returned> => {
  const { assessment, countryIso, cycle, global } = props
  const tree = await RepositoryRepository.getManyTree({ assessment, cycle, countryIso, global })
  return collectFileEntries(tree)
}
