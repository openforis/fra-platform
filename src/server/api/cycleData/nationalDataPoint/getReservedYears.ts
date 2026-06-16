import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import { Requests } from 'server/utils'

export const getReservedYears = async (req: CountryRequest, res: Response): Promise<void> => {
  try {
    const { countryIso } = req.query
    const { assessment, cycle } = req.context

    const reservedYears = await NationalDataPointController.getReservedYears({ assessment, cycle, countryIso })

    Requests.send(res, reservedYears)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
