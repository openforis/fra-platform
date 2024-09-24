import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { Areas, CountryIso } from 'meta/area'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  tableNames: Array<string>
  countryISOs: Array<CountryIso>
  variables: Array<string>
  columns: Array<string>
  mergeOdp: string
}>

export const getTableData = async (req: GetTableDataRequest, res: Response) => {
  try {
    const {
      assessmentName,
      cycleName,
      tableNames = [],
      countryIso,
      countryISOs,
      variables,
      columns,
      mergeOdp: mergeOdpReq,
    } = req.query
    // if mergeOdp is not passed, then by default result data includes odp for table 1a and 1b if available
    const mergeOdp = !mergeOdpReq || mergeOdpReq === 'true'

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const isRegion = !Areas.isISOCountry(countryIso)

    // When fetching data for regions, use getAggregatedTableData
    const getData = isRegion ? CycleDataController.TableData.getAggregatedTableData : CycleDataController.getTableData

    const props = { assessment, cycle, countryIso, countryISOs, tableNames, variables, columns, mergeOdp }
    const table = await getData(props)

    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
