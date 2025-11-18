import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CountryRequest<{ uuid: string }>

export const getRepositoryFileMeta = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { uuid } = req.query

    const props = { assessment, cycle, uuid }
    const fileMeta = await CycleDataController.Repository.getFileMeta(props)

    Requests.send(res, fileMeta)
    return
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
