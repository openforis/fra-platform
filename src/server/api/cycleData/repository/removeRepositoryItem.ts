import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type QueryParams = {
  uuid: string
}

export const removeRepositoryItem = async (req: CycleDataRequest<QueryParams>, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, sectionName, uuid } = req.query

    const user = Requests.getUser(req)

    const props = { assessment, cycle, countryIso, sectionName, user, uuid }
    await CycleDataController.Repository.remove(props)

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
