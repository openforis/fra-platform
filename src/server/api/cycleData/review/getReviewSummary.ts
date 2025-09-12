import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getReviewSummary = async (req: CycleRequest, res: Response): Promise<void> => {
  try {
    const { countryIso } = req.query
    const { assessment, cycle } = req.context

    const user = Requests.getUser(req)
    const reviewSummary = await CycleDataController.getReviewSummary({ countryIso, assessment, cycle, user })

    Requests.send(res, reviewSummary)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
