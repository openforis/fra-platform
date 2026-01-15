import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CountryRequest

export const isVerificationInProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, country, cycle } = req.context
    const { countryIso } = country
    const activeJob = await CycleDataController.Links.getActiveVerifyJob({
      assessment,
      countryIso,
      cycle,
    })

    Requests.send(res, Boolean(activeJob))
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
