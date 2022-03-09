import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController, CycleDataController } from '@server/controller'
import { CountryIso } from '@meta/area'
import { NodeValue } from '@meta/assessment'

export const persistNodeValue = async (req: Request, res: Response) => {
  try {
    const value = <NodeValue>req.body
    const { assessmentName, countryIso, colName, cycleName, tableName, variableName } = <Record<string, string>>(
      req.query
    )
    const user = Requests.getRequestUser(req)

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
      user,
      variableName,
      value,
    })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
