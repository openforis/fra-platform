import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { CountryIso } from 'meta/area/countryIso'

import { TableDataController } from 'server/controller/cycleData/tableData'
import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  columns: Array<string>
  countryISOs: Array<CountryIso>
  mergeOdp: string
  tableNames: Array<string>
  variables: Array<string>
}>

export const getTableData = async (req: GetTableDataRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { columns, countryISOs, mergeOdp: mergeOdpReq, tableNames = [], variables } = req.query
    // if mergeOdp is not passed, then by default result data includes odp for table 1a and 1b if available
    const mergeOdp = !mergeOdpReq || mergeOdpReq === 'true'

    const props = { assessment, cycle, countryISOs, tableNames, variables, columns, mergeOdp }
    const table = await TableDataController.getData(props)

    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
