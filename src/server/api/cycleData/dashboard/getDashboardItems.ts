import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { DashboardController } from 'server/controller/cycleData/dashboard'
import Requests from 'server/utils/requests'

export const getDashboardItems = async (req: CycleRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso } = req.query

    const result = await DashboardController.getManyItems({ assessment, cycle, countryIso })
    Requests.send(res, result)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
