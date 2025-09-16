import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const clearTable = async (req: CycleDataRequest, res: Response): Promise<void> => {
  try {
    const { sectionName, tableName } = req.query
    const user = Requests.getUser(req)
    const { assessment, country, cycle } = req.context

    const nodes = await CycleDataController.clearTableData({ assessment, country, cycle, sectionName, tableName, user })

    return Requests.sendOk(res, nodes)
  } catch (e) {
    return Requests.sendErr(res, e)
  }
}
