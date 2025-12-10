import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CountryRequest

export const verifyLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context

    const user = Requests.getUser(req)

    await CycleDataController.Links.verify({ assessment, cycle, user })

    Requests.send(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
