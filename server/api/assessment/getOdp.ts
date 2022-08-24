import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { CycleDataController } from '@server/controller/cycleData'
import { Requests } from '@server/utils'

export const getOriginalDataPoint = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, year, countryIso } = req.params
    const odp = await CycleDataController.getOriginalDataPoint({
      assessmentName,
      cycleName,
      year,
      countryIso: countryIso as CountryIso,
    })
    Requests.send(res, odp)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
