import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { ReviewController } from 'server/controller/cycleData/review'
import Requests from 'server/utils/requests'

export const getReviewSummary = async (req: CountryRequest, res: Response): Promise<void> => {
  try {
    const { countryIso } = req.query
    const { assessment, cycle } = req.context

    const user = Requests.getUser(req)
    const reviewSummary = await ReviewController.getReviewSummary({ countryIso, assessment, cycle, user })

    Requests.send(res, reviewSummary)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
