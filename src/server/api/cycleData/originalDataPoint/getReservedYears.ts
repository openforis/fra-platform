import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'

export const getReservedYears = async (req: CountryRequest, res: Response): Promise<void> => {
  try {
    const { countryIso } = req.query
    const { assessment, cycle } = req.context

    const reservedYears = await CycleDataController.getOriginalDataPointReservedYears({ assessment, cycle, countryIso })

    Requests.send(res, reservedYears)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
