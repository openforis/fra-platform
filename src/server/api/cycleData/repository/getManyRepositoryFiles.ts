import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CountryRequest<{ global: string }>

export const getManyRepositoryFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cycle } = req.context
    const { countryIso, global = 'false' } = req.query

    const props = { cycle, countryIso, global: JSON.parse(global) }
    const files = await CycleDataController.Repository.getManyFiles(props)

    await Responses.sendZip(res, files)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
