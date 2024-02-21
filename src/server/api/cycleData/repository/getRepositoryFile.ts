import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { Lang } from 'meta/lang'
import { Translations } from 'meta/translation'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CycleRequest

export const getRepositoryFile = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, metadata } = req.query
    const { uuid } = req.params

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, uuid }
    const { file, repositoryItem } = await CycleDataController.Repository.getFile(props)

    if (metadata) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { file: _, ...rest } = file
      Requests.send(res, rest)
      return
    }

    // Append the original file extension to the file name
    const label = Translations.getLabel({ translation: repositoryItem.props.translation, language: Lang.en })
    const extension = file.name.split('.').pop()
    const fileName = `${label}.${extension}`

    Responses.sendFile(res, fileName, file.file)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
