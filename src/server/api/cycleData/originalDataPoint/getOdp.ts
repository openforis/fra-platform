import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'

export const getOriginalDataPoint = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, year, countryIso } = req.query
    const odp = await CycleDataController.getOriginalDataPoint({
      assessmentName,
      cycleName,
      year,
      countryIso,
    })
    Requests.send(res, odp)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
