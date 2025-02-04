import { Response } from 'express'
import { Objects } from 'utils/objects'

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
    const info = await CycleDataController.History.LastApproved.getInfo({ assessment, cycle, countryIso })

    let tableData = {}
    if (!Objects.isNil(info)) {
      const props = { assessment, cycle, info, countryISOs: [countryIso], tableNames }
      tableData = await CycleDataController.TableData.getTableDataLastApproved(props) // getTableDataLastApproved -> import './getTableData' -> filter tableNames + replace cycle
    }

    Requests.send(res, tableData)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
