import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleRequest

export const getRepositoryFileMeta = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, uuid } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, uuid }
    const fileMeta = await CycleDataController.Repository.getFileMeta(props)

    Requests.send(res, fileMeta)
    return
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
