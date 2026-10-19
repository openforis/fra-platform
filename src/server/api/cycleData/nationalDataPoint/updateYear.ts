import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import Requests from 'server/utils/requests'

type Request = CountryRequest<never, { id: string; year: string; targetYear: string }>

export const updateYear = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sectionName } = req.query
    const { id, targetYear, year } = req.body
    const { assessment, country, cycle } = req.context

    const user = Requests.getUser(req)
    const propsUpdate = { assessment, cycle, sectionName, country, id, year, targetYear, user }

    const returnedOriginalDataPoint = await NationalDataPointController.updateYear(propsUpdate)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
