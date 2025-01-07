import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CountryIso, RegionCode } from 'meta/area'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  columns: Array<string>
  countryISOs: Array<CountryIso>
  mergeOdp: string
  regionCode?: RegionCode
  tableNames: Array<string>
  variables: Array<string>
}>

export const getTableData = async (req: GetTableDataRequest, res: Response) => {
  try {
    const {
      assessmentName,
      columns,
      countryISOs,
      cycleName,
      mergeOdp: mergeOdpReq,
      regionCode,
      tableNames = [],
      variables,
    } = req.query
    // if mergeOdp is not passed, then by default result data includes odp for table 1a and 1b if available
    const mergeOdp = !mergeOdpReq || mergeOdpReq === 'true'

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    // When fetching data for regions, use getAggregatedTableData
    const getData = regionCode ? CycleDataController.TableData.getAggregatedTableData : CycleDataController.getTableData

    const props = { assessment, cycle, regionCode, countryISOs, tableNames, variables, columns, mergeOdp }
    const table = await getData(props)

    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
