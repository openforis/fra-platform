import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'

export const getOriginalDataPoints = async (req: CountryRequest, res: Response): Promise<void> => {
  try {
    const { countryIso } = req.query
    const { assessment, cycle } = req.context

    const originalDataPoints = await CycleDataController.getOriginalDataPoints({ assessment, cycle, countryIso })

    Requests.send(res, originalDataPoints)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
