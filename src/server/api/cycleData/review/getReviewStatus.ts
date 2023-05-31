import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getReviewStatus = async (req: CycleDataRequest<{ odpId: string }>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, sectionName, odpId } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const user = Requests.getUser(req)
    const reviewstatus = await CycleDataController.getReviewStatus({
      assessment,
      cycle,
      countryIso,
      sectionName,
      user,
      odpId,
    })

    Requests.send(res, reviewstatus)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
