import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CountryRequest<{ global: string }>

export const getManyRepository = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, global = 'false' } = req.query
    const { assessment, cycle } = req.context

    const isGlobal = JSON.parse(global)
    const props = { assessment, cycle, countryIso, global: isGlobal }

    // Return global items as list
    // Return country items as tree
    const data = isGlobal
      ? await CycleDataController.Repository.getMany(props)
      : await CycleDataController.Repository.getManyAsTree(props)

    Requests.send(res, data)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
