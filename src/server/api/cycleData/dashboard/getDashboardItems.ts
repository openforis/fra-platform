import { Response } from 'express'

import { CycleRequest } from 'meta/api/request/cycle'
import { AreaCode } from 'meta/area/areaCode'

import { DashboardController } from 'server/controller/cycleData/dashboard'
import Requests from 'server/utils/requests'

export const getDashboardItems = async (req: CycleRequest<{ areaCode: AreaCode }>, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { areaCode } = req.query

    const result = await DashboardController.getManyItems({ assessment, cycle, areaCode })
    Requests.send(res, result)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
