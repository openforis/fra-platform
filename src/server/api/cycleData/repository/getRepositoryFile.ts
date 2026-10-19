import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { Lang } from 'meta/lang'
import { Translations } from 'meta/translation/translations'

import { RepositoryController } from 'server/controller/cycleData/repository'
import { FileStorage, FileStorageUtils } from 'server/service/fileStorage'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CountryRequest

export const getRepositoryFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { uuid } = req.params

    const props = { assessment, cycle, uuid }
    const { file, repositoryItem } = await RepositoryController.getOneFile(props)

    // Append the original file extension to the file name
    const label = Translations.getLabel({ translation: repositoryItem.props.translation, language: Lang.en })
    const extension = file.name.split('.').pop()
    const fileName = `${label}.${extension}`

    const key = repositoryItem.fileUuid
    const fileStream = await FileStorage.File.get({ key })

    Responses.sendFileStream(res, fileName, fileStream, FileStorageUtils.getContentType(extension))
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
