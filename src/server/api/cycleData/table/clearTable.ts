import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { TableName } from 'meta/assessment/table'

import { TableDataController } from 'server/controller/cycleData/tableData'
import Requests from 'server/utils/requests'

export const clearTable = async (req: CycleDataRequest<{ tableName: TableName }>, res: Response): Promise<void> => {
  try {
    const { sectionName, tableName } = req.query
    const user = Requests.getUser(req)
    const { assessment, country, cycle } = req.context

    const nodes = await TableDataController.clearData({ assessment, country, cycle, sectionName, tableName, user })

    return Requests.sendOk(res, nodes)
  } catch (e) {
    return Requests.sendErr(res, e)
  }
}
