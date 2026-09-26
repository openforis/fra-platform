import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { TableName } from 'meta/assessment/table'

import { DataValidationService } from 'server/service/dataValidation'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{
  tableNames: Array<TableName>
}>

export const getTableValidations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { countryIso, tableNames = [] } = req.query
    const { assessment, cycle } = req.context

    const tableValidations = await DataValidationService.getTableValidations({
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
