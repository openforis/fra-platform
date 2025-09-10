import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

type Request = CycleRequest & { global: string }

export const getManyRepositoryFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, global = false } = req.query

    const props = { assessment, cycle, countryIso, global: JSON.parse(global) }
    const files = await CycleDataController.Repository.getManyFiles(props)

    await Responses.sendZip(res, files)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
