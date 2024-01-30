import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleRequest & {
  global: boolean
}

export const getManyRepository = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, global } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, countryIso, global }
    const items = await CycleDataController.Repository.getMany(props)

    Requests.send(res, items)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
