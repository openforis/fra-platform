import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'
import { triggerVerifyLinksWorker } from 'server/worker/tasks/verifyLinks/triggerVerifyLinksWorker'

type Request = CountryRequest

export const verifyLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, country, cycle } = req.context
    const { countryIso } = country
    const user = Requests.getUser(req)

    await CycleDataController.Links.verify({ assessment, countryIso, cycle, user })
    await triggerVerifyLinksWorker()

    Requests.send(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
