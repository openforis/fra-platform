import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import Requests from 'server/utils/requests'

type Request = CountryRequest<never, { originalDataPoint: OriginalDataPoint }>

export const updateNationalClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { originalDataPoint } = req.body
    const user = Requests.getUser(req)
    const { assessment, country, cycle } = req.context

    const propsUpdate = { assessment, cycle, country, originalDataPoint, user }
    const returnedOriginalDataPoint = await NationalDataPointController.updateNationalClasses(propsUpdate)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
