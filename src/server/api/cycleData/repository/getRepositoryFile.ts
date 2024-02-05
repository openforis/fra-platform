import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CycleRequest<never>

export const getRepositoryFile = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query
    const { uuid } = req.params

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, uuid }
    const { file, repositoryItem } = await CycleDataController.Repository.getFile(props)

    Responses.sendFile(res, repositoryItem.name, file)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
