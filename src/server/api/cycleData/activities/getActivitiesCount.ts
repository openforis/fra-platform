import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getActivitiesCount = async (req: CycleDataRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso } = req.query

    const activitiesCount = await CycleDataController.getActivitiesCount({ assessment, cycle, countryIso })

    Requests.sendOk(res, activitiesCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
