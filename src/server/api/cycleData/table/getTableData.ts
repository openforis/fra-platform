import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CountryIso } from 'meta/area'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  tableNames: Array<string>
  countryISOs: Array<CountryIso>
  variables: Array<string>
  columns: Array<string>
  mergeOdp: string
  faoEstimates: string
}>

export const getTableData = async (req: GetTableDataRequest, res: Response) => {
  try {
    const {
      assessmentName,
      cycleName,
      tableNames = [],
      countryISOs,
      variables,
      columns,
      mergeOdp: mergeOdpReq,
      faoEstimates: faoEstimatesReq,
    } = req.query
    // if mergeOdp is not passed, then by default result data includes odp for table 1a and 1b if available
    const mergeOdp = !mergeOdpReq || mergeOdpReq === 'true'
    const faoEstimates = faoEstimatesReq === 'true'

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const table = await CycleDataController.getTableData({
      assessment,
      cycle,
      countryISOs,
      tableNames,
      variables,
      columns,
      mergeOdp,
      faoEstimates,
    })

    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
