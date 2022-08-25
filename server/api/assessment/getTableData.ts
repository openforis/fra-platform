import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getTableData = async (req: Request, res: Response) => {
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
    } = req.query as {
      assessmentName: string
      cycleName: string
      section: string
      tableNames: Array<string>
      countryISOs: Array<CountryIso>
      variables: Array<string>
      columns: Array<string>
      mergeOdp: string
      aggregate: string
    }

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
