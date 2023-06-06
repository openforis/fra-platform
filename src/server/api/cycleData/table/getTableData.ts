import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CountryIso } from 'meta/area'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getTableData = async (
  req: CycleDataRequest<{
    tableNames: Array<string>
    countryISOs: Array<CountryIso>
    variables: Array<string>
    columns: Array<string>
    mergeOdp: string
    aggregate: string
  }>,
  res: Response
) => {
  try {
    const {
      assessmentName,
      cycleName,
      tableNames = [],
      countryISOs,
      variables,
      columns,
      mergeOdp,
      aggregate,
    } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const table = await CycleDataController.getTableData({
      cycle,
      assessment,
      tableNames,
      countryISOs,
      variables,
      columns,
      // if mergeOdp is not passed, then by default result data includes odp for table 1a and 1b if available
      mergeOdp: !mergeOdp || mergeOdp === 'true',
      aggregate: aggregate === 'true',
    })
    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
