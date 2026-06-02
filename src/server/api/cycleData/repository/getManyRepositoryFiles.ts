import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CountryRequest<{ global: string }>

export const getManyRepositoryFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, global = 'false' } = req.query

    const isGlobal = JSON.parse(global)
    const props = { assessment, cycle, countryIso, global: isGlobal }
    const files = await CycleDataController.Repository.getManyFiles(props)

    const zipName = `repository_${isGlobal ? 'global' : countryIso}`
    await Responses.sendZip(res, files, zipName)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
