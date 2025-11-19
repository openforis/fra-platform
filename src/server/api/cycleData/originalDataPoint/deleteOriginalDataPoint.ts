import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CountryRequest<{ year: string }>

export const deleteOriginalDataPoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, year } = req.query
    const { assessment, country, cycle } = req.context

    const originalDataPoint = await CycleDataController.getOriginalDataPoint({ assessment, cycle, year, countryIso })

    const user = Requests.getUser(req)
    const propsRemove = { assessment, cycle, country, originalDataPoint, user }
    const returnedOriginalDataPoint = await CycleDataController.removeOriginalDataPoint(propsRemove)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
