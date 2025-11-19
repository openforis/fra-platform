import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getReviewStatus = async (req: CycleDataRequest<{ odpId: string }>, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, odpId, sectionName } = req.query

    const user = Requests.getUser(req)
    const reviewStatus = await CycleDataController.getReviewStatus({
      assessment,
      cycle,
      countryIso,
      sectionName,
      user,
      odpId,
    })

    Requests.send(res, reviewStatus)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
