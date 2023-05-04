import { Response } from 'express'

import { CycleDataRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getDataSources = async (
  req: CycleDataRequest<{ tableName: string; variableName: string }>,
  res: Response
) => {
  try {
    const { assessmentName, countryIso, cycleName, sectionName, tableName, variableName } = req.query

    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const dataSources = await CycleDataController.getDataSources({
      assessment,
      countryIso,
      cycle,
      sectionName,
      tableName,
      variableName,
    })

    Requests.send(res, dataSources)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
