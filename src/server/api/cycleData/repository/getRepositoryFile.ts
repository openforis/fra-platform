import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { Lang } from 'meta/lang'
import { Translations } from 'meta/translation'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { FileStorage, FileStorageUtils } from 'server/service/fileStorage'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CycleRequest

export const getRepositoryFile = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query
    const { uuid } = req.params

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, uuid }
    const { file, repositoryItem } = await CycleDataController.Repository.getOneFile(props)

    // Append the original file extension to the file name
    const label = Translations.getLabel({ translation: repositoryItem.props.translation, language: Lang.en })
    const extension = file.name.split('.').pop()
    const fileName = `${label}.${extension}`

    const key = repositoryItem.fileUuid
    const fileStream = await FileStorage.getFile({ key })

    Responses.sendFileStream(res, fileName, fileStream, FileStorageUtils.getContentType(extension))
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
