import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { Cycles } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  tableNames: Array<string>
  countryISOs: Array<CountryIso>
}>

export const getTableDataHistory = async (req: GetTableDataRequest, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, tableNames } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    // const info: HistoryLastApprovedInfo = await History.LastApproved.getInfo({ assessment, cycle, countryIso })

    let tableData = {}
    // if (info.prevCycle)
    const prevCycle = Cycles.getPreviousCycle({ assessment, cycle })
    if (prevCycle) {
      const mergeOdp = true
      const props = { assessment, cycle: prevCycle, countryISOs: [countryIso], tableNames, mergeOdp }
      tableData = await CycleDataController.getTableData(props)
    }

    Requests.send(res, tableData)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
