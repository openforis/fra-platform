import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleRequest<never, { id: string; year: string; targetYear: string }>

export const updateOriginalDataPointYear = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sectionName } = req.query
    const { id, targetYear, year } = req.body
    const { assessment, country, cycle } = req.context

    const user = Requests.getUser(req)
    const propsUpdate = { assessment, cycle, sectionName, country, id, year, targetYear, user }

    const returnedOriginalDataPoint = await CycleDataController.updateOriginalDataPointYear(propsUpdate)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
