import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<never, { originalDataPoint: OriginalDataPoint }>
export const updateOriginalDataPointOriginalData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sectionName } = req.query
    const { originalDataPoint } = req.body
    const { assessment, country, cycle } = req.context
    const user = Requests.getUser(req)

    const propsUpdate = { assessment, cycle, sectionName, country, originalDataPoint, user }
    const returnedOriginalDataPoint = await CycleDataController.updateOriginalDataPointOriginalData(propsUpdate)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
