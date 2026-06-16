import { Request, Response } from 'express'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'

import { TableDataController } from 'server/controller/cycleData/tableData'
import Requests from 'server/utils/requests'

type GetDataParams = {
  assessmentName: AssessmentName
  columns: Array<string>
  countryISOs: Array<CountryIso>
  tableNames: Array<string>
  variables: Array<string>
}
type GetDataRequest = Request<never, never, Body, GetDataParams>

export const getData = async (req: GetDataRequest, res: Response): Promise<void> => {
  try {
    const { assessment } = req.context
    const { columns, countryISOs, tableNames, variables } = req.query
    const data = await TableDataController.getLastPublishedData({
      assessment,
      columns,
      countryISOs,
      tableNames,
      variables,
    })

    Requests.send(res, data)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
