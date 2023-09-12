import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const clearTable = async (req: CycleDataRequest, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, sectionName, tableName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
      metaCache: true,
    })

    const nodes = await CycleDataController.clearTableData({
      assessment,
      countryIso,
      cycle,
      sectionName,
      tableName,
      user: Requests.getUser(req),
    })

    return Requests.sendOk(res, nodes)
  } catch (e) {
    return Requests.sendErr(res, e)
  }
}
