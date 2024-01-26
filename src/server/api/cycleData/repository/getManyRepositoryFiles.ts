import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getManyRepositoryFiles = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, countryIso }
    const createdRepositoryEntity = await CycleDataController.Repository.getManyFiles(props)

    Requests.send(res, createdRepositoryEntity)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
