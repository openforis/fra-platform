import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CountryRequest<{ global: string }>

export const getManyRepository = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, global = 'false' } = req.query
    const { cycle } = req.context
    const isGlobal = JSON.parse(global)
    const props = { countryIso, cycleUuid: isGlobal ? cycle.uuid : undefined, global: isGlobal }
    const items = await CycleDataController.Repository.getMany(props)

    Requests.send(res, items)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
