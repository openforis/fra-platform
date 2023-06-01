import { Response } from 'express'

import { CycleDataRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getTableEstimations = async (req: CycleDataRequest<{ tableName: string }>, res: Response) => {
  try {
    const { assessmentName, countryIso, cycleName, tableName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const table = await CycleDataController.getTableEstimations({
      assessment,
      countryIso,
      cycle,
      tableName,
    })
    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
