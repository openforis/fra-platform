import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import { Requests } from 'server/utils'

export const getMany = async (req: CountryRequest, res: Response): Promise<void> => {
  try {
    const { countryIso } = req.query
    const { assessment, cycle } = req.context

    const originalDataPoints = await NationalDataPointController.getMany({
      assessment,
      countryISOs: [countryIso],
      cycle,
    })

    Requests.send(res, originalDataPoints)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
