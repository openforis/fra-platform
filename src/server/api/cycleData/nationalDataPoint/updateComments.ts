import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { OriginalDataPoint, OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import Requests from 'server/utils/requests'

type Request = CountryRequest<never, { field: OriginalDataPointCommentKey; originalDataPoint: OriginalDataPoint }>

export const updateComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { field, originalDataPoint } = req.body
    const user = Requests.getUser(req)
    const { assessment, country, cycle } = req.context

    const propsUpdate = { assessment, cycle, country, field, originalDataPoint, user }
    const returnedOriginalDataPoint = await NationalDataPointController.updateComments(propsUpdate)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
