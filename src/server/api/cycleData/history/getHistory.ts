import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'
import { ActivityLogMessage } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type HistoryRequest = TablePaginatedDataRequest<{
  sectionName?: string
  targetName: string
  message: ActivityLogMessage
}>

export const getHistory = async (req: HistoryRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName, targetName, message } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, countryIso, sectionName, targetName, message }
    const history = await CycleDataController.History.getHistory(props)

    Requests.send(res, history)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
