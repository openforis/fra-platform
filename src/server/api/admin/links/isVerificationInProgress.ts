import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CountryRequest

export const isVerificationInProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context

    const activeJobs = await CycleDataController.Links.getActiveVerifyJobs({ assessment, cycle })
    const isVerificationInProgress = activeJobs.length > 0

    Requests.send(res, isVerificationInProgress)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
