import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import Requests from 'server/utils/requests'

type Request = CountryRequest<{ year: string }>

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, year } = req.query
    const { assessment, country, cycle } = req.context

    const originalDataPoint = await NationalDataPointController.getOne({ assessment, cycle, year, countryIso })

    const user = Requests.getUser(req)
    const propsRemove = { assessment, cycle, country, originalDataPoint, user }
    const returnedOriginalDataPoint = await NationalDataPointController.remove(propsRemove)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
