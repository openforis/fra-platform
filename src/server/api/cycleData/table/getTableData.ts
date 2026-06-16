import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { CountryIso } from 'meta/area/countryIso'
import { RegionCode } from 'meta/area/regionCode'

import { TableDataController } from 'server/controller/cycleData/tableData'
import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  columns: Array<string>
  countryISOs: Array<CountryIso>
  mergeOdp: string
  regionCode?: RegionCode
  tableNames: Array<string>
  variables: Array<string>
}>

export const getTableData = async (req: GetTableDataRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { columns, countryISOs, mergeOdp: mergeOdpReq, regionCode, tableNames = [], variables } = req.query
    // if mergeOdp is not passed, then by default result data includes odp for table 1a and 1b if available
    const mergeOdp = !mergeOdpReq || mergeOdpReq === 'true'

    // When fetching data for regions, use getAggregatedTableData
    const getData = regionCode ? TableDataController.getAggregatedData : TableDataController.getData

    const props = { assessment, cycle, regionCode, countryISOs, tableNames, variables, columns, mergeOdp }
    const table = await getData(props)

    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
