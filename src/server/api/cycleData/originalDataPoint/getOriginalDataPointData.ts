import { Request, Response } from 'express'

import { CountryIso } from 'meta/area'
import { TableNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getOriginalDataPointData = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = <Record<string, string>>req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const countryISOs = [countryIso as CountryIso]
    const tableNames = [TableNames.originalDataPointValue]
    const data = await CycleDataController.getTableData({ assessment, cycle, countryISOs, tableNames })

    Requests.send(res, data)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
