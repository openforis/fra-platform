import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { RepositoryController } from 'server/controller/cycleData/repository'
import Requests from 'server/utils/requests'

type Request = CountryRequest<{ global: string }>

export const getManyRepository = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, global = 'false' } = req.query
    const { assessment, cycle } = req.context

    const props = { assessment, cycle, countryIso, global: JSON.parse(global) }
    const tree = await RepositoryController.getMany(props)

    Requests.send(res, tree)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
