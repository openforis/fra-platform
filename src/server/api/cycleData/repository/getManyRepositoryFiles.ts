import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CycleRequest

export const getManyRepositoryFiles = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, global = false } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const props = { assessment, cycle, countryIso, global }
    const files = await CycleDataController.Repository.getManyFiles(props)

    await Responses.sendZip(res, files)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
