import { Response } from 'express'

import { CycleRequest } from 'meta/api/request/cycle'

import { AreaController } from 'server/controller/area'
import Requests from 'server/utils/requests'

export const getAreas = async (req: CycleRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context

    const [countries, regionGroups] = await Promise.all([
      AreaController.getCountries({ assessment, cycle }),
      AreaController.getRegionGroups({ assessment, cycle }),
    ])

    Requests.sendOk(res, { countries, regionGroups })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
