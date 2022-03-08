import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController, CycleDataController } from '@server/controller'
import { CountryIso } from '@meta/area'

export const persistNodeValue = async (req: Request, res: Response) => {
  try {
    const { variableName, value } = req.body
    const { assessmentName, countryIso, colName, cycleName, tableName } = req.query as Record<string, string>

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      name: assessmentName,
      cycleName,
      metaCache: true,
    })

    await CycleDataController.persistNodeValue({
      assessment,
      countryIso: countryIso as CountryIso,
      colName,
      cycle,
      tableName,
      user: Requests.getRequestUser(req),
      variableName,
      value,
    })
    // TODO Remove
    const tableData = await CycleDataController.getTableData({
      countryIso: countryIso as CountryIso,
      cycle,
      assessment,
      tableNames: [tableName],
    })

    Requests.sendOk(res, tableData)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
