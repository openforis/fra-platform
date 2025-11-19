import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  tableNames: Array<string>
}>

export const getTableDataHistory = async (req: GetTableDataRequest, res: Response): Promise<void> => {
  try {
    const { countryIso, tableNames } = req.query
    const { assessment, cycle } = req.context

    const props = { assessment, cycle, countryISOs: [countryIso], tableNames }
    const tableData = await CycleDataController.TableData.getTableDataLastApproved(props)

    Requests.send(res, tableData)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
