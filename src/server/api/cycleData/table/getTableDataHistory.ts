import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  tableNames: Array<string>
}>

export const getTableDataHistory = async (req: GetTableDataRequest, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, tableNames } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, countryISOs: [countryIso], tableNames }
    const tableData = await CycleDataController.TableData.getTableDataLastApproved(props)

    Requests.send(res, tableData)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
