import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { CountryIso } from '@meta/area'
import { CycleDataController } from '@server/controller/cycleData'
import { AssessmentController } from '@server/controller'

export const getTableData = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = req.params
    const { tableNames } = req.query as { tableNames: Array<string> }

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const table = await CycleDataController.getTableData({
      countryIso: countryIso as CountryIso,
      cycle,
      assessment,
      tableNames,
    })
    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
