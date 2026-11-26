import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { ActivitiesController } from 'server/controller/cycleData/activities'
import Requests from 'server/utils/requests'

export const refreshActivities = async (req: CountryRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso } = req.query

    await ActivitiesController.refreshActivities({ assessment, cycle, countryIso })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
