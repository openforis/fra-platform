import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { TableName } from 'meta/assessment/table'

import { ValidationsController } from 'server/controller/cycleData/validations'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{
  tableNames: Array<TableName>
}>

export const getTableValidations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, tableNames = [] } = req.query
    const { assessment, cycle } = req.context

    const tableValidations = await ValidationsController.getTableValidations({
      assessment,
      countryIso,
      cycle,
      tableNames,
    })

    Requests.send(res, tableValidations)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
