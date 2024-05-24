import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleRequest

export const verifyLinks = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const user = Requests.getUser(req)

    await CycleDataController.Link.visitCycleLinks({ assessment, cycle, user })

    Requests.send(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
