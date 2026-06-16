import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import { Requests } from 'server/utils'

type Request = CycleDataRequest<{ year: string }>

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, year } = req.query
    const { assessment, cycle } = req.context

    const odp = await NationalDataPointController.getOne({ assessment, cycle, year, countryIso })

    Requests.send(res, odp)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
