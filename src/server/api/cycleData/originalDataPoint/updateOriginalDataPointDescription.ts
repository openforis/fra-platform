import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { OriginalDataPoint, OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CountryRequest<never, { field: OriginalDataPointCommentKey; originalDataPoint: OriginalDataPoint }>

export const updateOriginalDataPointDescription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { field, originalDataPoint } = req.body
    const user = Requests.getUser(req)
    const { assessment, country, cycle } = req.context

    const propsUpdate = { assessment, cycle, country, field, originalDataPoint, user }
    const returnedOriginalDataPoint = await CycleDataController.updateOriginalDataPointDescription(propsUpdate)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
