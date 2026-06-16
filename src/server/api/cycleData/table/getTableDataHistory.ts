import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'

import { TableDataController } from 'server/controller/cycleData/tableData'
import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  tableNames: Array<string>
}>

export const getTableDataHistory = async (req: GetTableDataRequest, res: Response): Promise<void> => {
  try {
    const { countryIso, tableNames } = req.query
    const { assessment, cycle } = req.context

    const props = { assessment, cycle, countryISOs: [countryIso], tableNames }
    const tableData = await TableDataController.getLastApproved(props)

    Requests.send(res, tableData)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
