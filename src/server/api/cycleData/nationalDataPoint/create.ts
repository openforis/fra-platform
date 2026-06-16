import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<never, { originalDataPoint: OriginalDataPoint }>

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sectionName } = req.query
    const { originalDataPoint } = req.body
    const { assessment, country, cycle } = req.context

    if (!originalDataPoint.year) {
      throw new Error(`odpMissingYear`)
    }

    const propsCreate = { assessment, cycle, country, originalDataPoint, sectionName, user: Requests.getUser(req) }
    const returnedOriginalDataPoint = await NationalDataPointController.create(propsCreate)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
