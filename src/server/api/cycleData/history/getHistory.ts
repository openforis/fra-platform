import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = TablePaginatedDataRequest

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName } = req.query
    const { target } = req.params
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, countryIso, sectionName, target }
    const history = await CycleDataController.History.getHistory(props)

    Requests.send(res, history)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
