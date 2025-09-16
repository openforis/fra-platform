import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleRequest

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
