import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'

type Request = CycleDataRequest<{ year: string }>

export const getOriginalDataPoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, year } = req.query
    const { assessment, cycle } = req.context

    const odp = await CycleDataController.getOriginalDataPoint({ assessment, cycle, year, countryIso })

    Requests.send(res, odp)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
