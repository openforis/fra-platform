import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'

import { ActivitiesController } from 'server/controller/cycleData/activities'
import Requests from 'server/utils/requests'

export const getActivitiesCount = async (req: CycleDataRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso } = req.query

    const activitiesCount = await ActivitiesController.getActivitiesCount({ assessment, cycle, countryIso })

    Requests.sendOk(res, activitiesCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
