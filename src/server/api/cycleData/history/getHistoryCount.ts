import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getHistoryCount = async (req: TablePaginatedDataRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName } = req.query
    const { target } = req.params
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, countryIso, sectionName, target }
    const count = await CycleDataController.History.getCount(props)

    Requests.send(res, count)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
