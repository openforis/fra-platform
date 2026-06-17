import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { RepositoryController } from 'server/controller/cycleData/repository'
import Requests from 'server/utils/requests'

type Request = CountryRequest<{ uuid: string }>

export const getRepositoryFileMeta = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { uuid } = req.query

    const props = { assessment, cycle, uuid }
    const fileMeta = await RepositoryController.getFileMeta(props)

    Requests.send(res, fileMeta)
    return
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
