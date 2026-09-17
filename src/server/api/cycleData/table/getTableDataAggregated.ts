import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { CountryIso } from 'meta/area/countryIso'
import { Global } from 'meta/area/global'
import { RegionCode } from 'meta/area/regionCode'

import { TableDataController } from 'server/controller/cycleData/tableData'
import Requests from 'server/utils/requests'

type GetTableDataAggregatedRequest = CycleDataRequest<{
  columns: Array<string>
  countryISOs?: Array<CountryIso>
  regionCode: RegionCode | Global.WO
  tableNames: Array<string>
  variables: Array<string>
}>

export const getTableDataAggregated = async (req: GetTableDataAggregatedRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { columns, countryISOs = [], regionCode, tableNames = [], variables } = req.query

    if (!regionCode) {
      const error = new Error('Missing regionCode') as Error & { statusCode: number }
      error.statusCode = 400
      throw error
    }

    const props = { assessment, cycle, regionCode, countryISOs, tableNames, variables, columns, mergeOdp: true }
    const table = await TableDataController.getAggregatedData(props)

    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
