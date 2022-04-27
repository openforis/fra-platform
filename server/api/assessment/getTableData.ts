import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

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
    } = req.query as {
      assessmentName: AssessmentName
      cycleName: string
      section: string
      tableNames: Array<string>
      countryISOs: Array<CountryIso>
      variables: Array<string>
      columns: Array<string>
    }

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const table = await CycleDataController.getTableData({
      cycle,
      assessment,
      tableNames,
      countryISOs,
      variables,
      columns,
    })
    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
