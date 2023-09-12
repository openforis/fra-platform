import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import Requests from 'server/utils/requests'

export const getMetaCache = async (req: CycleRequest, res: Response) => {
  const { assessmentName, cycleName } = req.query
  try {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const metaCache = await AssessmentController.getMetaCache({ assessment, cycle })

    Requests.send(res, metaCache)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
