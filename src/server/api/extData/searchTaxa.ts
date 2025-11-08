import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { ExtDataController } from 'server/controller/extData'
import Requests from 'server/utils/requests'

type Query = { query: string; limit: string }

export const searchTaxa = async (req: CycleRequest<Query>, res: Response): Promise<void> => {
  try {
    const { limit = '20', query } = req.query
    const result = await ExtDataController.searchTaxa({
      limit,
      query,
    })
    Requests.send(res, result)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
