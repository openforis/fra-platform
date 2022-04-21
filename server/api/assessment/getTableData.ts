import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getTableData = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = req.params
    const {
      tableNames = [],
      countries,
      variables,
      columns,
    } = req.query as {
      tableNames: Array<string>
      countries: Array<CountryIso>
      variables: Array<string>
      columns: Array<string>
    }

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const table = await CycleDataController.getTableData({
      countryIso: countryIso as CountryIso,
      cycle,
      assessment,
      tableNames,
      countries,
      variables,
      columns,
    })
    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
